(function(e,r){"object"==typeof exports&&"undefined"!=typeof module&&"function"==typeof require?r(require("../moment")):"function"==typeof define&&define.amd?define(["../moment"],r):r(e.moment)})(this,function(e){"use strict"
function r(e,r,n,t){var a=e
switch(n){case"s":return t||r?"néhány másodperc":"néhány másodperce"
case"m":return"egy"+(t||r?" perc":" perce")
case"mm":return a+(t||r?" perc":" perce")
case"h":return"egy"+(t||r?" óra":" órája")
case"hh":return a+(t||r?" óra":" órája")
case"d":return"egy"+(t||r?" nap":" napja")
case"dd":return a+(t||r?" nap":" napja")
case"M":return"egy"+(t||r?" hónap":" hónapja")
case"MM":return a+(t||r?" hónap":" hónapja")
case"y":return"egy"+(t||r?" év":" éve")
case"yy":return a+(t||r?" év":" éve")}return""}function n(e){return(e?"":"[múlt] ")+"["+t[this.day()]+"] LT[-kor]"}var t="vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ")
return e.defineLocale("hu",{months:"január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),monthsShort:"jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),weekdays:"vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),weekdaysShort:"vas_hét_kedd_sze_csüt_pén_szo".split("_"),weekdaysMin:"v_h_k_sze_cs_p_szo".split("_"),longDateFormat:{LT:"H:mm",LTS:"H:mm:ss",L:"YYYY.MM.DD.",LL:"YYYY. MMMM D.",LLL:"YYYY. MMMM D. H:mm",LLLL:"YYYY. MMMM D., dddd H:mm"},meridiemParse:/de|du/i,isPM:function(e){return"u"===e.charAt(1).toLowerCase()},meridiem:function(e,r,n){return e<12?!0===n?"de":"DE":!0===n?"du":"DU"},calendar:{sameDay:"[ma] LT[-kor]",nextDay:"[holnap] LT[-kor]",nextWeek:function(){return n.call(this,!0)},lastDay:"[tegnap] LT[-kor]",lastWeek:function(){return n.call(this,!1)},sameElse:"L"},relativeTime:{future:"%s múlva",past:"%s",s:r,m:r,mm:r,h:r,hh:r,d:r,dd:r,M:r,MM:r,y:r,yy:r},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}})})
