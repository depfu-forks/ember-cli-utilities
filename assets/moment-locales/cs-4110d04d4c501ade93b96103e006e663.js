(function(e,n){"object"==typeof exports&&"undefined"!=typeof module&&"function"==typeof require?n(require("../moment")):"function"==typeof define&&define.amd?define(["../moment"],n):n(e.moment)})(this,function(e){"use strict"
function n(e){return e>1&&e<5&&1!=~~(e/10)}function t(e,t,r,s){var u=e+" "
switch(r){case"s":return t||s?"pár sekund":"pár sekundami"
case"m":return t?"minuta":s?"minutu":"minutou"
case"mm":return t||s?u+(n(e)?"minuty":"minut"):u+"minutami"
case"h":return t?"hodina":s?"hodinu":"hodinou"
case"hh":return t||s?u+(n(e)?"hodiny":"hodin"):u+"hodinami"
case"d":return t||s?"den":"dnem"
case"dd":return t||s?u+(n(e)?"dny":"dní"):u+"dny"
case"M":return t||s?"měsíc":"měsícem"
case"MM":return t||s?u+(n(e)?"měsíce":"měsíců"):u+"měsíci"
case"y":return t||s?"rok":"rokem"
case"yy":return t||s?u+(n(e)?"roky":"let"):u+"lety"}}var r="leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),s="led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_")
return e.defineLocale("cs",{months:r,monthsShort:s,monthsParse:function(e,n){var t,r=[]
for(t=0;t<12;t++)r[t]=new RegExp("^"+e[t]+"$|^"+n[t]+"$","i")
return r}(r,s),shortMonthsParse:function(e){var n,t=[]
for(n=0;n<12;n++)t[n]=new RegExp("^"+e[n]+"$","i")
return t}(s),longMonthsParse:function(e){var n,t=[]
for(n=0;n<12;n++)t[n]=new RegExp("^"+e[n]+"$","i")
return t}(r),weekdays:"neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),weekdaysShort:"ne_po_út_st_čt_pá_so".split("_"),weekdaysMin:"ne_po_út_st_čt_pá_so".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D. MMMM YYYY",LLL:"D. MMMM YYYY H:mm",LLLL:"dddd D. MMMM YYYY H:mm",l:"D. M. YYYY"},calendar:{sameDay:"[dnes v] LT",nextDay:"[zítra v] LT",nextWeek:function(){switch(this.day()){case 0:return"[v neděli v] LT"
case 1:case 2:return"[v] dddd [v] LT"
case 3:return"[ve středu v] LT"
case 4:return"[ve čtvrtek v] LT"
case 5:return"[v pátek v] LT"
case 6:return"[v sobotu v] LT"}},lastDay:"[včera v] LT",lastWeek:function(){switch(this.day()){case 0:return"[minulou neděli v] LT"
case 1:case 2:return"[minulé] dddd [v] LT"
case 3:return"[minulou středu v] LT"
case 4:case 5:return"[minulý] dddd [v] LT"
case 6:return"[minulou sobotu v] LT"}},sameElse:"L"},relativeTime:{future:"za %s",past:"před %s",s:t,m:t,mm:t,h:t,hh:t,d:t,dd:t,M:t,MM:t,y:t,yy:t},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}})})
