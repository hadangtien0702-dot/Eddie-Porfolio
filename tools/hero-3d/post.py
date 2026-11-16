import sys
from PIL import Image, ImageFilter, ImageChops
src,dst=sys.argv[1],sys.argv[2]
im=Image.open(src).convert("RGBA"); W,H=im.size
# bloom: bright warm areas bleed
rgb=im.convert("RGB"); a=im.getchannel("A")
hi=rgb.point(lambda v:max(0,v-150)*2.4)
hi=Image.composite(hi,Image.new("RGB",im.size,0),a)
glow=Image.new("RGBA",im.size,(0,0,0,0))
for rad,op in ((W/200,0.35),(W/60,0.3),(W/18,0.22)):
    g=hi.filter(ImageFilter.GaussianBlur(rad))
    ga=g.convert("L").point(lambda v:min(255,int(v*op*1.6)))
    layer=Image.new("RGBA",im.size,(255,120,40,0)); layer.putalpha(ga); glow.alpha_composite(layer)
out=Image.new("RGBA",im.size,(0,0,0,0)); out.alpha_composite(glow); out.alpha_composite(im)
top=Image.new("RGBA",im.size,(0,0,0,0)); 
g=hi.filter(ImageFilter.GaussianBlur(W/120)); ga=g.convert("L").point(lambda v:min(255,int(v*0.25)))
l=Image.new("RGBA",im.size,(255,190,130,0)); l.putalpha(ga); out.alpha_composite(l)
# fade the bottom into the page
fade=Image.linear_gradient("L").resize((W,H)).point(lambda v: 255 if v<215 else max(0,int(255*(1-(v-215)/40))))
out.putalpha(ImageChops.multiply(out.getchannel("A"),fade))
# soft fade on the left edge so the shoulder never ends in a hard cut
lf=Image.linear_gradient("L").rotate(90,expand=True).resize((W,H)).transpose(Image.FLIP_LEFT_RIGHT)
lf=lf.point(lambda v: 255 if v>26 else int(255*(v/26)**1.5))
out.putalpha(ImageChops.multiply(out.getchannel("A"),lf))
out.save(dst)
bg=Image.new("RGBA",im.size,(244,242,238,255)); bg.alpha_composite(out); bg.convert("RGB").save(dst.rsplit('.',1)[0]+"-preview.jpg",quality=88)
