# Dựng & render nhân vật 3D + ruy băng cho hero "ribbon" (public/images/01-Overview/ribbon-character.webp).
# Cần: pip install bpy pillow, font Inter, và base.obj (lưới người MakeHuman, giấy phép CC0) đặt cạnh file này:
#   https://raw.githubusercontent.com/makehumancommunity/makehuman/master/makehuman/data/3dobjs/base.obj
# Chạy:  python build.py -- 1.4 96 final   →  python post.py final.png final-out.png  →  đổi final-out.png sang .webp
# Đổi chữ: sửa VISOR_TXT (chữ trên kính) và words (chữ trên ruy băng) bên dưới rồi render lại.
import bpy, bmesh, math, sys, os, collections
from mathutils import Vector, Matrix
from PIL import Image, ImageDraw, ImageFont
OUT=os.path.dirname(os.path.abspath(__file__))
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
SCALE=float(args[0]) if args else 0.4
SAMPLES=int(args[1]) if len(args)>1 else 24
NAME=args[2] if len(args)>2 else "test"
CW,CH=1400,1100
bpy.ops.wm.read_factory_settings(use_empty=True)
sc=bpy.context.scene
def link(o): sc.collection.objects.link(o); return o
# ---------------- load MakeHuman base (CC0) ----------------
vs=[]; faces=[]; g=None; eye=[]
for l in open(OUT+'/base.obj'):
    if l.startswith('v '):
        x,y,z=map(float,l.split()[1:4]); vs.append((x,-z,y))
    elif l.startswith('g '): g=l.split()[1]
    elif l.startswith('f '):
        idx=[int(t.split('/')[0])-1 for t in l.split()[1:]]
        if g=='body': faces.append(idx)
        elif g=='helper-l-eye': eye+=idx
used=sorted({i for f in faces for i in f}); remap={i:k for k,i in enumerate(used)}
def smooth(a,b,x):
    t=max(0,min(1,(x-a)/(b-a))); return t*t*(3-2*t)
for sign in (1,-1):
    piv=Vector((sign*1.62,0.25,5.72))
    def posed(ang):
        out=[]
        for (x,y,z) in vs:
            if x*sign>1.25:
                w=smooth(1.25,2.25,x*sign)
                v=Matrix.Rotation(ang*w,4,'Y')@(Vector((x,y,z))-piv)+piv; out.append((v.x,v.y,v.z))
            else: out.append((x,y,z))
        return out
    A=math.radians(float(os.environ.get('ARM','20')))
    c1=posed(A*sign); c2=posed(-A*sign)
    vs=c1 if max(v[0]*sign for v in c1)<max(v[0]*sign for v in c2) else c2
me=bpy.data.meshes.new("body"); me.from_pydata([vs[i] for i in used],[],[[remap[i] for i in f] for f in faces]); me.update()
EYEZ=sum(vs[i][2] for i in eye)/len(eye); EYEY=min(vs[i][1] for i in eye)
body=link(bpy.data.objects.new("body",me))
mod=body.modifiers.new("s",'SUBSURF'); mod.levels=2; mod.render_levels=2
dg=bpy.context.evaluated_depsgraph_get(); em=bpy.data.meshes.new_from_object(body.evaluated_get(dg))
bpy.data.objects.remove(body)
src=bmesh.new(); src.from_mesh(em)
head=[v.co for v in src.verts if v.co.z>EYEZ-0.2 and v.co.z<EYEZ+0.2 and abs(v.co.x)<1.2]
HX=max(abs(c.x) for c in head); HF=min(c.y for c in head); HB=max(c.y for c in head)
HTOP=max(v.co.z for v in src.verts)
print("eye z",EYEZ,"eye y",EYEY,"head halfwidth",HX,"front",HF,"back",HB,"top",HTOP)
# ---------------- cut helpers ----------------
def cut(bm,co,no,sharp=True):
    """keep the side opposite to `no`, cap the hole"""
    r=bmesh.ops.bisect_plane(bm,geom=bm.verts[:]+bm.edges[:]+bm.faces[:],plane_co=co,plane_no=no,clear_outer=True)
    ed=[e for e in r['geom_cut'] if isinstance(e,bmesh.types.BMEdge)]
    if ed:
        f=bmesh.ops.triangle_fill(bm,edges=ed,use_beauty=True)
        for x in f['geom']:
            if isinstance(x,bmesh.types.BMFace): x.smooth=False
        for e in ed: e.smooth=False
Y0=HF+ (HB-HF)*0.40          # where slicing begins (just in front of the ear)
ZC=EYEZ-1.75                 # fins only above this height (shoulder line)
for f in src.faces: f.smooth=True
parts=[]
a=src.copy(); cut(a,Vector((0,Y0,0)),Vector((0,1,0))); parts.append(a)                     # front
b=src.copy(); cut(b,Vector((0,Y0,0)),Vector((0,-1,0))); cut(b,Vector((0,0,ZC)),Vector((0,0,1))); parts.append(b)  # back torso
hb=src.copy(); cut(hb,Vector((0,Y0,0)),Vector((0,-1,0))); cut(hb,Vector((0,0,ZC)),Vector((0,0,-1)))               # back of head+neck
T=0.05; G=0.13; y=Y0+G; k=0
ZH=EYEZ+0.1
slabs=[]
while y<HB+0.05:
    s=hb.copy(); cut(s,Vector((0,y,0)),Vector((0,-1,0))); cut(s,Vector((0,y+T,0)),Vector((0,1,0)))
    if len(s.faces):
        sc_=1.0+0.045*min(k,8)
        for v in s.verts:
            if v.co.z>ZC+0.9:
                w=min(1,(v.co.z-(ZC+0.9))/0.8)
                v.co.x*=1+(sc_-1)*w; v.co.z=ZH+(v.co.z-ZH)*(1+(sc_-1)*w)
        parts.append(s); slabs.append((s,y))
    y+=T+G; k+=1
# floating plates beyond the skull
for s0,y0_ in reversed(slabs):
    t_=s0.copy(); cut(t_,Vector((0,0,EYEZ-0.75)),Vector((0,0,-1)))
    if len(t_.verts)>40 and max(v.co.z for v in t_.verts)-min(v.co.z for v in t_.verts)>1.2: s0=t_; break
ylast=slabs[-1][1]; print("slabs",len(slabs),"base slab y",y0_,"last",ylast)
for i,f in enumerate((0.95,0.88,0.8,0.7,0.6,0.48,0.36,0.24)):
    s=s0.copy()
    cx=0; cz=EYEZ+0.2
    for v in s.verts:
        v.co.x*=f; v.co.z=cz+(v.co.z-cz)*f; v.co.y+= (ylast-y0_)+(T+G)*(i+1)
    parts.append(s)
allbm=bmesh.new()
for p in parts:
    m=bpy.data.meshes.new("t"); p.to_mesh(m); allbm.from_mesh(m); bpy.data.meshes.remove(m); p.free()
# shirt mask (tank top) as vertex attribute + slight thickness
lay=allbm.verts.layers.float.new("shirt")
SH_Z=EYEZ-2.05
for v in allbm.verts:
    c=v.co
    neck=SH_Z-0.75+0.42*c.x*c.x      # scoop neckline
    strap=1.75+max(0,(SH_Z-0.2-c.z))*0.25
    d=min(neck-c.z, strap-abs(c.x))
    v[lay]=max(0.0,min(1.0,d/0.12+0.5))
allbm.normal_update()
for v in allbm.verts:
    pass
bm_body=allbm
cm=bpy.data.meshes.new("char"); bm_body.to_mesh(cm)
char=link(bpy.data.objects.new("char",cm))
# ---------------- visor ----------------
def text_tile(path,text,size,h,font="/usr/share/fonts/opentype/inter/Inter-Black.otf",squeeze=1.0,pad=60,spacing=0):
    f=ImageFont.truetype(font,size); d0=ImageDraw.Draw(Image.new("L",(8,8)))
    w=sum(d0.textlength(ch,font=f)+spacing for ch in text)
    im=Image.new("L",(int(w+pad*2),h),0); d=ImageDraw.Draw(im); x=pad
    for ch in text:
        d.text((x,h/2),ch,font=f,fill=255,anchor="lm"); x+=d0.textlength(ch,font=f)+spacing
    if squeeze!=1: im=im.resize((int(im.width*squeeze),h),Image.LANCZOS)
    im.save(path); return im.width/h
VISOR_TXT="VIDEO STRATEGIST"
asp0=text_tile(OUT+"/visor.png",VISOR_TXT,150,256,squeeze=1,pad=40,spacing=10)
asp=text_tile(OUT+"/visor.png",VISOR_TXT,150,256,squeeze=(2.15/0.60)/asp0,pad=40,spacing=10)
VH=0.60; VZ=EYEZ+0.08; VPOS=0.665
vb=bmesh.new(); uvl=vb.loops.layers.uv.new("UVMap")
RX=HX*1.06; YC=(HF+HB)/2; RYF=(HB-HF)/2*1.03; NS=128
def vpt(t,off=0.0,dz=0.0):   # t: -1 (viewer-left side.. ) half superellipse front
    ang=math.radians(118)*t
    cx=math.sin(ang); cy=-math.cos(ang)
    n=2.3; r=(abs(cx)**n+abs(cy)**n)**(-1/n)
    return Vector(((RX+off)*cx*r, YC+(RYF+off)*cy*r, VZ+dz))
rows=[(-VH/2,0.0,0),(-VH/2+0.04,0.035,0.06),(VH/2-0.04,0.035,0.94),(VH/2,0.0,1)]
arc=[0]; 
for i in range(1,NS+1): arc.append(arc[-1]+(vpt(-1+2*i/NS)-vpt(-1+2*(i-1)/NS)).length)
LV=arc[-1]; TXTW=VH*asp
grid=[[vb.verts.new(vpt(-1+2*i/NS,off,dz)) for (dz,off,v) in rows] for i in range(NS+1)]
for i in range(NS):
    for j in range(3):
        f=vb.faces.new((grid[i][j],grid[i+1][j],grid[i+1][j+1],grid[i][j+1])); f.smooth=True
        for l,(ii,jj) in zip(f.loops,((i,j),(i+1,j),(i+1,j+1),(i,j+1))):
            u=(arc[ii]-LV*VPOS)/TXTW+0.5       # text centred a bit to the camera side
            l[uvl].uv=(u,rows[jj][2])
vm=bpy.data.meshes.new("visor"); vb.to_mesh(vm); visor=link(bpy.data.objects.new("visor",vm))
sol=visor.modifiers.new("so",'SOLIDIFY'); sol.thickness=0.05; sol.offset=1
# ---------------- pose: whole bust ----------------
PIV=Vector((0,0.3,EYEZ-1.2))
POSE=Matrix.Translation(PIV) @ Matrix.Rotation(math.radians(-52),4,'Z') @ Matrix.Rotation(math.radians(-13),4,'X') @ Matrix.Rotation(math.radians(4),4,'Y') @ Matrix.Translation(-PIV)
char.matrix_world=POSE; visor.matrix_world=POSE
# ---------------- ribbon ----------------
RW=0.50; TH=0.05
words=["Video","Strategy","Editing","AI Flow","Growth","Storytelling"]
font=ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-Medium.otf",104); H=256
d0=ImageDraw.Draw(Image.new("L",(10,10))); x=0; items=[]
for w in words:
    x+=95; items.append((x,w)); 
    for ch in w: x+=d0.textlength(ch,font=font)+5
    x+=95; items.append((x-11,"•")); 
TW=int(x); img=Image.new("L",(TW,H),0); d=ImageDraw.Draw(img)
for px,w in items:
    if w=="•": d.ellipse((px,H/2-11,px+22,H/2+11),fill=255)
    else:
        xx=px
        for ch in w: d.text((xx,H/2),ch,font=font,fill=255,anchor="lm"); xx+=d0.textlength(ch,font=font)+5
img.save(OUT+"/tile.png"); TILE=RW*TW/H
C=Vector((0.0,0.25,EYEZ-2.25))
TH0=math.radians(-240); TH1=math.radians(322)
def base(th):
    u=(th-TH0)/(TH1-TH0)
    R=3.05-1.2*u**0.9
    z=-0.65+1.75*u
    return Vector((R*math.cos(th), R*math.sin(th)*0.95, z))
ROT=Matrix.Rotation(math.radians(-6),4,'Y') @ Matrix.Rotation(math.radians(13),4,'X')
N=700
raw=[base(TH0+(TH1-TH0)*i/N) for i in range(N+1)]
step=(raw[-1]-raw[-2]); L=step.length; t0=step.normalized(); t1=Vector((1,0.7,0.16)).normalized()
M=int(9/L); cur=raw[N].copy()
for k in range(1,M+1):
    q=min(1,k/(M*0.4)); q=q*q*(3-2*q); cur=cur+(t0.lerp(t1,q)).normalized()*L; raw.append(cur.copy())
N=len(raw)-1; pts=[ROT@v+C for v in raw]; axis=(ROT@Vector((0,0,1))).normalized()
prof=[]; K=6
for i in range(K+1): prof.append((-RW/2+RW*i/K, TH/2, i/K, 0))
for i in range(1,4):
    a=math.pi/2-math.pi*i/4; prof.append((RW/2+TH/2*math.cos(a), TH/2*math.sin(a),1,2))
for i in range(K+1): prof.append((RW/2-RW*i/K, -TH/2, 1-i/K, 1))
for i in range(1,4):
    a=-math.pi/2-math.pi*i/4; prof.append((-RW/2+TH/2*math.cos(a), TH/2*math.sin(a),0,2))
P=len(prof); rb=bmesh.new(); uvl=rb.loops.layers.uv.new("UVMap"); fl=rb.loops.layers.uv.new("flag")
S=[0]
for i in range(1,N+1): S.append(S[-1]+(pts[i]-pts[i-1]).length)
rings=[]
for i in range(N+1):
    t=(pts[min(i+1,N)]-pts[max(i-1,0)]).normalized(); n=t.cross(axis).normalized(); wd=n.cross(t).normalized()
    if wd.dot(axis)<0: wd=-wd
    rings.append([rb.verts.new(pts[i]+wd*w+n*tt) for (w,tt,v,f) in prof])
for i in range(N):
    for j in range(P):
        j2=(j+1)%P; f=rb.faces.new((rings[i][j],rings[i+1][j],rings[i+1][j2],rings[i][j2])); f.smooth=True
        face=prof[j][3] if prof[j][3]==prof[j2][3] else 2
        for l,(ii,jj) in zip(f.loops,((i,j),(i+1,j),(i+1,j2),(i,j2))):
            u=S[ii]/TILE; 
            if face==1: u=-u
            l[uvl].uv=(u,prof[jj][2]); l[fl].uv=(1.0 if face!=2 else 0.0, 1.0 if face==1 else 0.0)
ribbon_hide=os.environ.get('NORIB')
rb.normal_update(); rm=bpy.data.meshes.new("ribbon"); rb.to_mesh(rm); ribbon=link(bpy.data.objects.new("ribbon",rm))
# ---------------- materials ----------------
def newmat(n):
    m=bpy.data.materials.new(n); m.use_nodes=True; nt=m.node_tree; nt.nodes.clear()
    o=nt.nodes.new("ShaderNodeOutputMaterial"); p=nt.nodes.new("ShaderNodeBsdfPrincipled"); nt.links.new(p.outputs[0],o.inputs[0]); return m,nt,p
def mix(nt,fac,a,b,blend='MIX'):
    n=nt.nodes.new("ShaderNodeMix"); n.data_type='RGBA'; n.blend_type=blend
    for sock,val in ((0,fac),(6,a),(7,b)):
        if hasattr(val,'links') or hasattr(val,'node'): nt.links.new(val,n.inputs[sock])
        elif sock==0: n.inputs[0].default_value=val
        else: n.inputs[sock].default_value=val
    return n.outputs[2]
# skin
m,nt,p=newmat("skin")
def mth(op,x,y=None,z=None):
    n=nt.nodes.new("ShaderNodeMath"); n.operation=op
    for i,v in enumerate((x,y,z)):
        if v is None: continue
        if isinstance(v,(int,float)): n.inputs[i].default_value=v
        else: nt.links.new(v,n.inputs[i])
    return n.outputs[0]
tc=nt.nodes.new("ShaderNodeTexCoord"); sx=nt.nodes.new("ShaderNodeSeparateXYZ"); nt.links.new(tc.outputs["Object"],sx.inputs[0])
X,Y_,Z=sx.outputs
neck=mth('ADD',mth('MULTIPLY',mth('MULTIPLY',X,X),0.40),SH_Z-0.80)
strap=mth('ADD',mth('MULTIPLY',mth('MAXIMUM',mth('SUBTRACT',SH_Z-0.2,Z),0),0.25),1.62)
d=mth('MINIMUM',mth('SUBTRACT',neck,Z),mth('SUBTRACT',strap,mth('ABSOLUTE',X)))
st=nt.nodes.new("ShaderNodeMapRange"); st.interpolation_type='SMOOTHSTEP'; nt.links.new(d,st.inputs[0]); st.inputs[1].default_value=-0.012; st.inputs[2].default_value=0.012
hem=nt.nodes.new("ShaderNodeMapRange"); hem.interpolation_type='SMOOTHSTEP'; nt.links.new(d,hem.inputs[0]); hem.inputs[1].default_value=0.0; hem.inputs[2].default_value=0.07; hem.inputs[3].default_value=1; hem.inputs[4].default_value=0
SHIRT=st.outputs[0]
lw=nt.nodes.new("ShaderNodeLayerWeight"); lw.inputs[0].default_value=0.30
cloth=mix(nt,hem.outputs[0],(0.07,0.12,0.16,1),(0.42,0.52,0.58,1))
base_c=mix(nt,SHIRT,(0.002,0.012,0.022,1),cloth)
rim=mix(nt,lw.outputs[1],(0,0,0,1),(0.10,0.42,0.60,1))
rimk=mix(nt,SHIRT,rim,mix(nt,lw.outputs[1],(0.01,0.02,0.03,1),(0.25,0.40,0.50,1)))
nt.links.new(base_c,p.inputs["Base Color"]); nt.links.new(rimk,p.inputs["Emission Color"]); p.inputs["Emission Strength"].default_value=0.55
rg=nt.nodes.new("ShaderNodeMapRange"); nt.links.new(SHIRT,rg.inputs[0]); rg.inputs[3].default_value=0.24; rg.inputs[4].default_value=0.55
nt.links.new(rg.outputs[0],p.inputs["Roughness"]); p.inputs["Coat Weight"].default_value=0.3; p.inputs["Coat Roughness"].default_value=0.2
char.data.materials.append(m)
# visor
m,nt,p=newmat("visor")
tex=nt.nodes.new("ShaderNodeTexImage"); tex.image=bpy.data.images.load(OUT+"/visor.png"); tex.image.colorspace_settings.name='Non-Color'; tex.extension='CLIP'
uv=nt.nodes.new("ShaderNodeUVMap"); uv.uv_map="UVMap"; nt.links.new(uv.outputs[0],tex.inputs[0])
col=mix(nt,tex.outputs[0],(1.0,0.27,0.03,1),(0.36,0.025,0.0,1))
p.inputs["Base Color"].default_value=(0.25,0.03,0,1); nt.links.new(col,p.inputs["Emission Color"]); p.inputs["Emission Strength"].default_value=1.0; p.inputs["Roughness"].default_value=0.45
visor.data.materials.append(m)
# ribbon
m,nt,p=newmat("rib")
tex=nt.nodes.new("ShaderNodeTexImage"); tex.image=bpy.data.images.load(OUT+"/tile.png"); tex.image.colorspace_settings.name='Non-Color'
uv=nt.nodes.new("ShaderNodeUVMap"); uv.uv_map="UVMap"; nt.links.new(uv.outputs[0],tex.inputs[0])
fu=nt.nodes.new("ShaderNodeUVMap"); fu.uv_map="flag"; sep=nt.nodes.new("ShaderNodeSeparateXYZ"); nt.links.new(fu.outputs[0],sep.inputs[0])
mul=nt.nodes.new("ShaderNodeMath"); mul.operation='MULTIPLY'; nt.links.new(tex.outputs[0],mul.inputs[0]); nt.links.new(sep.outputs[0],mul.inputs[1])
tf=nt.nodes.new("ShaderNodeMath"); tf.operation='MULTIPLY'; nt.links.new(mul.outputs[0],tf.inputs[0]); tf.inputs[1].default_value=0.92
# soft vertical gradient across the band (brighter edges, like frosted glass)
suv=nt.nodes.new("ShaderNodeSeparateXYZ"); nt.links.new(uv.outputs[0],suv.inputs[0])
edge=nt.nodes.new("ShaderNodeMath"); edge.operation='PINGPONG'; nt.links.new(suv.outputs[1],edge.inputs[0]); edge.inputs[1].default_value=0.5
er=nt.nodes.new("ShaderNodeMapRange"); nt.links.new(edge.outputs[0],er.inputs[0]); er.inputs[1].default_value=0.0; er.inputs[2].default_value=0.22; er.inputs[3].default_value=1; er.inputs[4].default_value=0
er.interpolation_type='SMOOTHSTEP'
band=mix(nt,er.outputs[0],(1.0,0.23,0.02,1),(1.0,0.40,0.11,1))
inner=mix(nt,sep.outputs[1],band,(0.75,0.13,0.01,1))
colt=mix(nt,tf.outputs[0],inner,(1,0.97,0.93,1))
dkb=mix(nt,1.0,colt,(0.45,0.45,0.45,1),"MULTIPLY"); nt.links.new(dkb,p.inputs["Base Color"]); nt.links.new(colt,p.inputs["Emission Color"]); p.inputs["Emission Strength"].default_value=0.62
p.inputs["Roughness"].default_value=0.32; p.inputs["Coat Weight"].default_value=0.4; p.inputs["Coat Roughness"].default_value=0.12
ribbon.data.materials.append(m); ribbon.hide_render=bool(ribbon_hide)
# ---------------- camera / light ----------------
cam=bpy.data.cameras.new("c"); cam.lens=243; cam.sensor_width=36; cam.clip_end=1000
co=link(bpy.data.objects.new("c",cam)); sc.camera=co
target=Vector((0.2,0,EYEZ-1.2)); co.location=target+Vector((0,-46,-4.5))
co.rotation_euler=(target-co.location).to_track_quat('-Z','Y').to_euler()
w=bpy.data.worlds.new("w"); sc.world=w; w.use_nodes=True
bg=w.node_tree.nodes["Background"]; bg.inputs[0].default_value=(0.9,0.93,1,1); bg.inputs[1].default_value=0.07
def area(loc,e,size,col=(1,1,1),tgt=None):
    l=bpy.data.lights.new("a",'AREA'); l.energy=e; l.size=size; l.color=col
    ob=link(bpy.data.objects.new("a",l)); ob.location=loc
    ob.rotation_euler=((tgt or Vector((0,0,EYEZ-0.5)))-Vector(loc)).to_track_quat('-Z','Y').to_euler()
area((-9,-10,EYEZ+5),200,8,(0.75,0.9,1))        # cool key, front-left above
area((9,8,EYEZ+2),2200,6,(1,1,1))                # white rim from behind-right
area((-10,7,EYEZ-1),1000,6,(0.8,0.92,1))         # rim from behind-left
area((4,-8,EYEZ-7),260,8,(1,0.55,0.25))
pl=bpy.data.lights.new('p','POINT'); pl.energy=95; pl.color=(1,0.2,0.03); pl.shadow_soft_size=0.3; po=link(bpy.data.objects.new('p',pl)); po.matrix_world=POSE@Matrix.Translation(Vector((0,HF-0.55,EYEZ-0.25)))          # warm bounce from below
sc.render.engine='CYCLES'; sc.cycles.samples=SAMPLES; sc.cycles.use_denoising=True
sc.render.film_transparent=True; sc.render.resolution_x=int(CW*SCALE); sc.render.resolution_y=int(CH*SCALE)
sc.render.image_settings.file_format='PNG'; sc.render.image_settings.color_mode='RGBA'
sc.view_settings.view_transform='Standard'; sc.view_settings.look='None'
sc.render.filepath=OUT+"/"+NAME+".png"; bpy.ops.render.render(write_still=True)
