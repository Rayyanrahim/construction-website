from pathlib import Path
from math import sin, cos, pi
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output/pdf/FL-Venture-Corporation-Logo-Concepts.pdf'
TMP = ROOT / 'tmp/pdfs'
for name, filename in [('DM','arial.ttf'),('DMS','arialbd.ttf'),('DMB','arialbd.ttf')]:
    pdfmetrics.registerFont(TTFont(name, 'C:/Windows/Fonts/'+filename))
pdfmetrics.registerFont(TTFont('Georgia', 'C:/Windows/Fonts/georgia.ttf'))
pdfmetrics.registerFont(TTFont('GeorgiaB', 'C:/Windows/Fonts/georgiab.ttf'))

N='#193D59'; O='#ED773B'; B='#326A8C'; SOFT='#F2F6F8'; WHITE='#FFFFFF'; MUTED='#65747E'; LINE='#DCE3E7'
W,H=960,680
c=canvas.Canvas(str(OUT), pagesize=(W,H), pageCompression=1)
c.setTitle('FL Venture Corporation | 18 Logo Concepts')
c.setAuthor('FL Venture Corporation')
c.setSubject('18 distinct vector logo directions in the existing navy and orange brand palette')

def rect(x,y,w,h,col):
    c.setFillColor(HexColor(col)); c.rect(x,y,w,h,stroke=0,fill=1)
def text(s,x,y,size=12,font='DM',color=N,align='left',tracking=None):
    c.setFillColor(HexColor(color)); c.setFont(font,size)
    if tracking is not None:
        tw=pdfmetrics.stringWidth(s,font,size)+max(0,len(s)-1)*tracking
        if align=='center': x-=tw/2
        t=c.beginText(x,y); t.setFont(font,size); t.setCharSpace(tracking); t.textOut(s); c.drawText(t)
    elif align=='center': c.drawCentredString(x,y,s)
    elif align=='right': c.drawRightString(x,y,s)
    else: c.drawString(x,y,s)
def line(pts,col=N,width=5,closed=False,fill=False):
    p=c.beginPath(); p.moveTo(*pts[0])
    for q in pts[1:]: p.lineTo(*q)
    if closed: p.close()
    c.setStrokeColor(HexColor(col)); c.setFillColor(HexColor(col)); c.setLineWidth(width)
    c.setLineJoin(0); c.setLineCap(0); c.drawPath(p,stroke=not fill,fill=fill)
def poly(pts,col): line(pts,col,closed=True,fill=True)
def circle(x,y,r,col,stroke=False,width=4):
    c.setFillColor(HexColor(col)); c.setStrokeColor(HexColor(col)); c.setLineWidth(width); c.circle(x,y,r,stroke=stroke,fill=not stroke)

def mark(i,x,y,size,reverse=False):
    c.saveState(); c.translate(x,y); c.scale(size/100,size/100)
    a=WHITE if reverse else N; blue=WHITE if reverse else B; bg=N if reverse else SOFT
    if i==1:
        for yy,xx in [(76,88),(51,67),(26,46)]: rect(10,yy,xx-10,11,a)
        line([(69,34),(84,19),(69,4)],O,10)
    elif i==2:
        poly([(12,12),(12,88),(63,88),(63,74),(28,74),(28,56),(55,56),(55,42),(28,42),(28,12)],a)
        poly([(61,65),(77,65),(77,26),(93,26),(93,12),(61,12)],O)
    elif i==3:
        line([(6,53),(50,88),(94,53)],a,10)
        line([(24,48),(24,13),(76,13),(76,48)],a,8)
        poly([(43,20),(43,58),(70,58),(70,47),(54,47),(54,20)],O)
    elif i==4:
        poly([(50,96),(89,81),(85,35),(70,15),(50,3),(30,15),(15,35),(11,81)],a)
        line([(28,69),(48,69),(48,54),(32,54),(32,33)],bg,7)
        line([(59,71),(59,33),(76,33)],O,8)
    elif i==5:
        poly([(50,96),(91,73),(50,50),(9,73)],O)
        poly([(9,65),(45,44),(45,3),(9,24)],a)
        poly([(55,44),(91,65),(91,24),(55,3)],blue)
    elif i==6:
        rect(12,15,18,43,a); rect(40,15,18,65,a); rect(68,15,18,82,O)
        line([(5,6),(95,6)],a,5)
    elif i==7:
        poly([(4,83),(27,83),(50,29),(40,7)],a)
        poly([(34,7),(73,93),(96,93),(57,7)],O)
    elif i==8:
        circle(50,50,39,a,True,4)
        poly([(50,96),(63,58),(50,50),(37,58)],O)
        poly([(50,4),(37,42),(50,50),(63,42)],a)
        poly([(4,50),(42,63),(50,50),(42,37)],a)
        poly([(96,50),(58,37),(50,50),(58,63)],blue)
    elif i==9:
        line([(14,9),(14,85),(73,85),(73,9)],a,11)
        line([(34,9),(34,63),(90,63)],O,11)
        rect(61,9,29,11,a)
    elif i==10:
        circle(50,50,43,a,True,5)
        text('FL',50,32,48,'GeorgiaB',a,'center')
        rect(23,15,54,5,O)
    elif i==11:
        rect(13,12,13,73,a); rect(74,12,13,73,a)
        line([(5,37),(50,71),(95,37)],O,7)
        line([(5,23),(95,23)],a,8)
        for xx in [34,50,66]: line([(xx,28),(xx,49 if xx!=50 else 61)],a,3)
    elif i==12:
        for offset,col in [(0,a),(23,O),(46,blue)]:
            p=c.beginPath(); p.moveTo(5,22+offset); p.curveTo(31,47+offset,62,-3+offset,95,22+offset)
            c.setStrokeColor(HexColor(col)); c.setLineWidth(8); c.drawPath(p,stroke=1)
    elif i==13:
        circle(51,62,25,O)
        rect(0,0,100,45,bg)
        line([(5,40),(33,40),(48,50),(65,40),(95,40)],a,7)
        line([(14,23),(86,23)],a,7)
        for angle in [30,60,90,120,150]:
            r=angle*pi/180; line([(51+34*cos(r),62+34*sin(r)),(51+41*cos(r),62+41*sin(r))],O,4)
    elif i==14:
        poly([(3,82),(28,82),(57,50),(28,18),(3,18),(32,50)],a)
        poly([(43,82),(68,82),(97,50),(68,18),(43,18),(72,50)],O)
        poly([(3,18),(28,18),(57,50),(44,64)],blue)
    elif i==15:
        poly([(7,87),(93,87),(72,12),(28,12)],a)
        poly([(38,77),(62,77),(57,28),(43,28)],O)
        line([(23,5),(77,5)],a,6)
    elif i==16:
        rect(13,82,74,11,a); rect(21,65,58,9,O)
        for xx in [27,45,63]: rect(xx,22,10,36,a)
        rect(21,9,58,8,a); rect(13,0,74,6,a)
    elif i==17:
        rect(7,7,86,86,a)
        poly([(25,25),(25,77),(65,77),(65,65),(38,65),(38,54),(59,54),(59,42),(38,42),(38,25)],bg)
        poly([(63,57),(76,57),(76,25),(48,25),(48,37),(63,37)],O)
    elif i==18:
        text('F',4,14,83,'DMB',a)
        text('L',48,14,83,'DMB',a)
        poly([(68,82),(89,82),(89,61)],O)
    c.restoreState()

NAMES=['Forward','Interlock','Roofline','Assurance','Dimension','Skyline','Vantage','Compass','Framework','Signature','Connection','Flow','Suncoast','Momentum','Keystone','Foundation','Counterform','Essential']
DESCS=[
 'An evolution of the current bars and forward arrow.',
 'A custom FL monogram built from two interlocking forms.',
 'A clear roof silhouette with a structural F at its center.',
 'A compact shield that puts the FL initials first.',
 'Three architectural planes form a dimensional block.',
 'An ascending skyline with an orange leading tower.',
 'A bold V with an upward cut and a forward attitude.',
 'Four directional points for a broad corporate identity.',
 'Layered structural frames create an open FL monogram.',
 'A circular serif monogram with a restrained orange rule.',
 'A bridge silhouette signals structure and connection.',
 'Three flowing lines bring a subtle HVAC connection.',
 'A Florida-inspired sun, roofline and coastal horizon.',
 'Two folded ribbons create a strong forward-facing symbol.',
 'A tapered keystone becomes a strong central emblem.',
 'A modern column pairs stability with clean geometry.',
 'A solid square holds an FL mark in negative space.',
 'A direct typographic FL mark with an orange corner.'
]

def lockup(i,x,y,width,reverse=False,stack=False,name=None):
    # Canonical horizontal lockup: 410 x 100. Stacked: 260 x 155.
    col=WHITE if reverse else N
    c.saveState(); c.translate(x,y)
    if stack:
        c.scale(width/260,width/260)
        mark(i,95,65,70,reverse)
        text('FL VENTURE',130,35,23,'GeorgiaB' if i==10 else 'DMB',col,'center',.3)
        text('CORPORATION',130,15,9,'DMS',col,'center',2.5)
    else:
        c.scale(width/410,width/410)
        mark(i,0,0,89,reverse)
        font='GeorgiaB' if i in [10,16] else 'DMB'
        if name:
            main,sub=name
        else: main,sub='FL VENTURE','CORPORATION'
        sz=32 if len(main)<12 else 27
        text(main,113,49,sz,font,col,tracking=.2)
        text(sub,115,24,11,'DMS',col,tracking=3 if len(sub)<15 else 1.2)
    c.restoreState()

page=0
def footer(dark=False):
    col=WHITE if dark else MUTED
    text('FL VENTURE CORPORATION  /  LOGO EXPLORATION',42,25,8,'DMS',col,tracking=.8)
    text(f'{page:02d} / 14',918,25,9,'DM',col,'right')
def start(label,title,subtitle):
    global page
    page+=1; rect(0,0,W,H,WHITE)
    text(label,42,638,9,'DMB',O,tracking=1.8)
    text(title,42,595,31,'DMB')
    text(subtitle,42,570,11,'DM',MUTED)
    footer()
def end(): c.showPage()

# Cover
page+=1; rect(0,0,W,H,N)
text('BRAND EXPLORATION / 01',48,627,10,'DMS',WHITE,tracking=2)
rect(48,568,62,5,O)
text('FL Venture',48,491,49,'DMB',WHITE)
text('Corporation',48,434,49,'DMB',WHITE)
text('18 distinct logo directions.',50,374,18,'DM',WHITE)
text('One familiar color story.',50,347,18,'DM',WHITE)
text('MONOGRAMS / ARCHITECTURE / CORPORATE',50,283,9,'DMS',WHITE,tracking=1)
for j,(col,label) in enumerate([(N,'193D59'),(O,'ED773B'),(B,'326A8C')]):
    x=50+j*137
    rect(x,177,117,37,col)
    if j==0: line([(x,177),(x,214),(x+117,214),(x+117,177),(x,177)],B,1)
    text('#'+label,x,157,10,'DM',WHITE)
text('Existing navy + orange identity retained.',50,112,10,'DM',WHITE)
for idx,num in enumerate([2,5,7,10,13,17]):
    xx=570+(idx%2)*165; yy=450-(idx//2)*155
    rect(xx,yy,137,130,'#214964')
    mark(num,xx+28,yy+25,80,True)
footer(True); end()

# Three quick selection sheets.
for section in range(3):
    start(f'QUICK COMPARE / {section+1:02d}', ['A strong first impression.','Built around the venture.','Distinctive by design.'][section],
          'Choose by concept number. Each direction is shown larger on the following pages.')
    for slot in range(6):
        i=section*6+slot+1; col=slot%3; row=slot//3; x=42+col*296; y=315-row*244
        rect(x,y,280,223,SOFT)
        text(f'{i:02d}',x+17,y+197,11,'DMB',O)
        text(NAMES[i-1],x+263,y+197,11,'DMS',N,'right')
        lockup(i,x+20,y+34,240,stack=True)
    end()

# Two full presentations per page, each on light and dark.
for pair in range(9):
    a=pair*2+1; b=a+1
    start(f'CONCEPTS {a:02d} + {b:02d}', f'{NAMES[a-1]} / {NAMES[b-1]}', 'Primary identity on white, with a reversed version on the existing navy.')
    for row,i in enumerate([a,b]):
        y=318-row*245
        text(f'{i:02d}',42,y+204,15,'DMB',O)
        text(NAMES[i-1],77,y+204,16,'DMB')
        text(DESCS[i-1],42,y+183,10,'DM',MUTED)
        rect(42,y,530,164,SOFT); rect(588,y,330,164,N)
        lockup(i,65,y+32,465)
        lockup(i,615,y+53,278,True)
        text('PRIMARY',58,y+12,7,'DMS',MUTED,tracking=1.2)
        text('REVERSED',603,y+12,7,'DMS',WHITE,tracking=1.2)
    end()

# Naming alternatives, visibly separated from the design collection.
start('WORDING OPTIONS', 'One symbol. Different name treatments.', 'The main collection uses FL Venture Corporation. These are optional wording alternatives.')
alternatives=[('FL VENTURE','CORPORATION'),('FL VENTURE','CORP.'),('FLORIDA VENTURE','CORPORATION'),('FLORIDA','CONSTRUCTION VENTURE')]
for ix,nm in enumerate(alternatives):
    xx=42+(ix%2)*446; yy=326-(ix//2)*204
    rect(xx,yy,430,180,SOFT)
    text(['A / REQUESTED NAME','B / ABBREVIATED','C / EXPANDED FLORIDA','D / CURRENT WEBSITE NAME'][ix],xx+18,yy+155,9,'DMS',O,tracking=.8)
    lockup(2,xx+23,yy+35,386,name=nm)
text('TO SELECT',42,80,9,'DMB',O,tracking=1.2)
text('Pick a concept number (01-18) and a name treatment (A-D).',139,80,11,'DMS',N)
end()
assert page==14,page
c.save()
print(OUT)
