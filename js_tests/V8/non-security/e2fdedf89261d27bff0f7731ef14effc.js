m=function(x){n(x,x>>0)};
n=function(x,y){((Math.fround(x)>>0)/(y-(0x80000000|0)|0))|m};
a=[,,,,,,-0x80000001,,0];
for(j=0;j<a.length*4;++j){
    for(k=0;k<a.length;++k){
	m(a[k]);
    }
}
