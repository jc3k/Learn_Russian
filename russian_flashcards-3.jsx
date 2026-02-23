import { useState, useEffect, useCallback, useRef } from "react";

const WORDS = [
  {r:"не",e:"not",p:"nye",s:"nye"},{r:"я",e:"I",p:"ya",s:"ya"},{r:"в",e:"in",p:"v",s:"v"},{r:"что",e:"what / that",p:"chto",s:"chto"},{r:"ты",e:"you (informal)",p:"ty",s:"ti"},{r:"это",e:"this / it",p:"eto",s:"eto"},{r:"на",e:"on / at",p:"na",s:"na"},{r:"и",e:"and",p:"i",s:"i"},{r:"он",e:"he",p:"on",s:"on"},{r:"да",e:"yes",p:"da",s:"da"},
  {r:"как",e:"how / like",p:"kak",s:"kak"},{r:"но",e:"but",p:"no",s:"no"},{r:"мне",e:"to me / me",p:"mnye",s:"mnye"},{r:"нет",e:"no",p:"nyet",s:"nyet"},{r:"с",e:"with / from",p:"s",s:"s"},{r:"так",e:"so / thus",p:"tak",s:"tak"},{r:"все",e:"all / everyone",p:"vsye",s:"vsye"},{r:"у",e:"at / by / have",p:"u",s:"u"},{r:"его",e:"him / his",p:"yego",s:"yego"},{r:"уже",e:"already",p:"uzhye",s:"uzhye"},
  {r:"то",e:"that / then",p:"to",s:"to"},{r:"за",e:"for / behind",p:"za",s:"za"},{r:"они",e:"they",p:"oni",s:"oni"},{r:"из",e:"from / out of",p:"iz",s:"iz"},{r:"тебя",e:"you (gen/acc)",p:"tyebya",s:"tyebya"},{r:"мы",e:"we",p:"my",s:"mi"},{r:"тут",e:"here",p:"tut",s:"tut"},{r:"вот",e:"here is / look",p:"vot",s:"vot"},{r:"же",e:"(emphatic particle)",p:"zhye",s:"zhye"},{r:"если",e:"if",p:"yesli",s:"yesli"},
  {r:"ещё",e:"still / yet / more",p:"yeshchyo",s:"yeshchyo"},{r:"или",e:"or",p:"ili",s:"ili"},{r:"она",e:"she",p:"ona",s:"ona"},{r:"всё",e:"everything / all",p:"vsyo",s:"vsyo"},{r:"по",e:"along / by / about",p:"po",s:"po"},{r:"ну",e:"well / come on",p:"nu",s:"nu"},{r:"бы",e:"would (conditional)",p:"by",s:"bi"},{r:"есть",e:"there is / to eat",p:"yest",s:"yest"},{r:"меня",e:"me / of me",p:"myenya",s:"myenya"},{r:"было",e:"was (neut.)",p:"bylo",s:"bilo"},
  {r:"когда",e:"when",p:"kogda",s:"kogda"},{r:"только",e:"only",p:"tolko",s:"tolko"},{r:"был",e:"was (masc.)",p:"byl",s:"bil"},{r:"хорошо",e:"good / well / okay",p:"khorosho",s:"jorrosho"},{r:"здесь",e:"here",p:"zdyes",s:"zdyes"},{r:"кто",e:"who",p:"kto",s:"kto"},{r:"там",e:"there",p:"tam",s:"tam"},{r:"тебе",e:"to you (dat.)",p:"tyebye",s:"tyebye"},{r:"мой",e:"my (masc.)",p:"moy",s:"moy"},{r:"сейчас",e:"now / right now",p:"syeychas",s:"syeychas"},
  {r:"вы",e:"you (formal/plural)",p:"vy",s:"vi"},{r:"где",e:"where",p:"gdye",s:"gdye"},{r:"чего",e:"of what / why",p:"chyego",s:"chyego"},{r:"до",e:"until / before / up to",p:"do",s:"do"},{r:"очень",e:"very",p:"ochyen",s:"ochyen"},{r:"надо",e:"need to / must",p:"nado",s:"nado"},{r:"ничего",e:"nothing / okay",p:"nichyego",s:"nichyego"},{r:"их",e:"their / them",p:"ikh",s:"ij"},{r:"нам",e:"to us",p:"nam",s:"nam"},{r:"нас",e:"us",p:"nas",s:"nas"},
  {r:"о",e:"about",p:"o",s:"o"},{r:"им",e:"to them",p:"im",s:"im"},{r:"хочу",e:"I want",p:"khochu",s:"jochu"},{r:"чтобы",e:"in order to / so that",p:"chtoby",s:"chtobi"},{r:"вам",e:"to you (formal dat.)",p:"vam",s:"vam"},{r:"вас",e:"you (formal acc.)",p:"vas",s:"vas"},{r:"этого",e:"of this (gen.)",p:"etogo",s:"etogo"},{r:"могу",e:"I can",p:"mogu",s:"mogu"},{r:"сказал",e:"said (masc. past)",p:"skazal",s:"skazal"},{r:"тоже",e:"also / too",p:"tozhye",s:"tozhye"},
  {r:"просто",e:"simply / just",p:"prosto",s:"prrosto"},{r:"вообще",e:"in general / at all",p:"voobshchye",s:"voobshchye"},{r:"один",e:"one / alone (masc.)",p:"odin",s:"odin"},{r:"день",e:"day",p:"dyen",s:"dyen"},{r:"время",e:"time",p:"vryemya",s:"vrryemya"},{r:"люди",e:"people",p:"lyudi",s:"lyudi"},{r:"всегда",e:"always",p:"vsyegda",s:"vsyegda"},{r:"лет",e:"years (gen. pl.)",p:"lyet",s:"lyet"},{r:"сам",e:"himself / oneself (masc.)",p:"sam",s:"sam"},{r:"думаю",e:"I think",p:"dumayu",s:"dumayu"},
  {r:"говорит",e:"says / speaks",p:"govorit",s:"govorrit"},{r:"тогда",e:"then / at that time",p:"togda",s:"togda"},{r:"даже",e:"even",p:"dazhye",s:"dazhye"},{r:"нельзя",e:"one cannot / forbidden",p:"nyelzya",s:"nyelzya"},{r:"раз",e:"time / once",p:"raz",s:"rraz"},{r:"два",e:"two",p:"dva",s:"dva"},{r:"куда",e:"where to",p:"kuda",s:"kuda"},{r:"твой",e:"your (masc. informal)",p:"tvoy",s:"tvoy"},{r:"можно",e:"one may / it's possible",p:"mozhno",s:"mozhno"},{r:"человек",e:"person / man",p:"chyelovyek",s:"chyelovyek"},
  {r:"наш",e:"our (masc.)",p:"nash",s:"nash"},{r:"другой",e:"other / another",p:"drugoy",s:"drrugoy"},{r:"ему",e:"to him (dat.)",p:"yemu",s:"yemu"},{r:"жизнь",e:"life",p:"zhizn",s:"zhizn"},{r:"много",e:"much / many",p:"mnogo",s:"mnogo"},{r:"который",e:"which / who (masc.)",p:"kotoryy",s:"kotorriy"},{r:"которые",e:"which / who (pl.)",p:"kotoryye",s:"kotorriye"},{r:"всех",e:"of all / everyone",p:"vsyekh",s:"vsyej"},{r:"должен",e:"must / should (masc.)",p:"dolzhyen",s:"dolzhyen"},{r:"хочешь",e:"you want (informal)",p:"khochyesh",s:"jochyesh"},
  {r:"почему",e:"why",p:"pochyemu",s:"pochyemu"},{r:"сделать",e:"to do / to make",p:"sdyelat",s:"sdyelat"},{r:"знать",e:"to know",p:"znat",s:"znat"},{r:"идти",e:"to go (on foot)",p:"idti",s:"idti"},{r:"пойти",e:"to go / set off",p:"poyti",s:"poyti"},{r:"работа",e:"work / job",p:"rabota",s:"rrabota"},{r:"дом",e:"house / home",p:"dom",s:"dom"},{r:"после",e:"after",p:"poslye",s:"poslye"},{r:"без",e:"without",p:"byez",s:"byez"},{r:"через",e:"through / in (time)",p:"chyeryez",s:"chyerryez"},
  {r:"против",e:"against",p:"protiv",s:"prrotiv"},{r:"перед",e:"in front of / before",p:"pyeryed",s:"pyerryed"},{r:"между",e:"between",p:"myezhdu",s:"myezhdu"},{r:"вместе",e:"together",p:"vmyestye",s:"vmyestye"},{r:"себя",e:"oneself / himself",p:"syebya",s:"syebya"},{r:"такой",e:"such / like that (masc.)",p:"takoy",s:"takoy"},{r:"этот",e:"this (masc.)",p:"etot",s:"etot"},{r:"ней",e:"her (prep/instr)",p:"nyey",s:"nyey"},{r:"ей",e:"to her",p:"yey",s:"yey"},{r:"тот",e:"that (masc.)",p:"tot",s:"tot"},
  {r:"те",e:"those (pl.)",p:"tye",s:"tye"},{r:"эти",e:"these (pl.)",p:"eti",s:"eti"},{r:"первый",e:"first",p:"pyervyy",s:"pyerrviy"},{r:"большой",e:"big / large",p:"bolshoy",s:"bolshoy"},{r:"новый",e:"new",p:"novyy",s:"noviy"},{r:"знаешь",e:"you know (informal)",p:"znayesh",s:"znayesh"},{r:"наша",e:"our (fem.)",p:"nasha",s:"nasha"},{r:"снова",e:"again",p:"snova",s:"snova"},{r:"опять",e:"again",p:"opyat",s:"opyat"},{r:"никогда",e:"never",p:"nikogda",s:"nikogda"},
  {r:"долго",e:"for a long time",p:"dolgo",s:"dolgo"},{r:"может",e:"can / maybe (3rd)",p:"mozhyet",s:"mozhyet"},{r:"прийти",e:"to come / arrive",p:"priyti",s:"prriyti"},{r:"быть",e:"to be",p:"byt",s:"bit"},{r:"сказать",e:"to say / to tell",p:"skazat",s:"skazat"},{r:"теперь",e:"now / nowadays",p:"tyepyer",s:"tyepyerr"},{r:"делать",e:"to do / to make",p:"dyelat",s:"dyelat"},{r:"знал",e:"knew (masc. past)",p:"znal",s:"znal"},{r:"сказала",e:"said (fem. past)",p:"skazala",s:"skazala"},{r:"правда",e:"truth / really",p:"pravda",s:"prravda"},
  {r:"хочет",e:"wants (3rd pers.)",p:"khochyet",s:"jochyet"},{r:"ладно",e:"okay / alright",p:"ladno",s:"ladno"},{r:"понимаю",e:"I understand",p:"ponimayu",s:"ponimayu"},{r:"думал",e:"thought (masc. past)",p:"dumal",s:"dumal"},{r:"стал",e:"became (masc. past)",p:"stal",s:"stal"},{r:"пожалуйста",e:"please / you're welcome",p:"pozhaluysta",s:"pozhaluysta"},{r:"лучше",e:"better",p:"luchshye",s:"luchshye"},{r:"никто",e:"no one / nobody",p:"nikto",s:"nikto"},{r:"мало",e:"little / few",p:"malo",s:"malo"},{r:"нужно",e:"it is necessary",p:"nuzhno",s:"nuzhno"},
  {r:"спасибо",e:"thank you",p:"spasibo",s:"spasibo"},{r:"год",e:"year",p:"god",s:"god"},{r:"ночь",e:"night",p:"noch",s:"noch"},{r:"смотри",e:"look / watch (imp.)",p:"smotri",s:"smotrri"},{r:"послушай",e:"listen (imp.)",p:"poslushay",s:"poslushay"},{r:"скажи",e:"tell / say (imp.)",p:"skazhi",s:"skazhi"},{r:"давай",e:"let's / come on / give",p:"davay",s:"davay"},{r:"иди",e:"go (imperative)",p:"idi",s:"idi"},{r:"подожди",e:"wait (imperative)",p:"podozhdi",s:"podozhdi"},{r:"хватит",e:"enough / that's enough",p:"khvatit",s:"jvatit"},
  {r:"пора",e:"it's time",p:"pora",s:"porra"},{r:"должна",e:"must / should (fem.)",p:"dolzhna",s:"dolzhna"},{r:"будет",e:"will be",p:"budyet",s:"budyet"},{r:"видел",e:"saw (masc. past)",p:"vidyel",s:"vidyel"},{r:"наверное",e:"probably",p:"navyernoye",s:"navyerrnoye"},{r:"своего",e:"one's own (gen.)",p:"svoyego",s:"svoyego"},{r:"свой",e:"one's own (masc.)",p:"svoy",s:"svoy"},{r:"дела",e:"affairs / matters",p:"dyela",s:"dyela"},{r:"дело",e:"business / matter",p:"dyelo",s:"dyelo"},{r:"хотел",e:"wanted (masc. past)",p:"khotyel",s:"jotyel"},
  {r:"пришёл",e:"came / arrived (masc.)",p:"prishyol",s:"prrishyol"},{r:"увидеть",e:"to see",p:"uvidyet",s:"uvidyet"},{r:"знает",e:"knows (3rd pers.)",p:"znayet",s:"znayet"},{r:"говорю",e:"I say / I speak",p:"govoryu",s:"govorryu"},{r:"понял",e:"understood (masc.)",p:"ponyal",s:"ponyal"},{r:"можешь",e:"you can (informal)",p:"mozhyesh",s:"mozhyesh"},{r:"никак",e:"no way / in no way",p:"nikak",s:"nikak"},{r:"точно",e:"exactly / definitely",p:"tochno",s:"tochno"},{r:"вдруг",e:"suddenly",p:"vdrug",s:"vdrrug"},{r:"больше",e:"more / bigger / no more",p:"bolshye",s:"bolshye"},
  {r:"место",e:"place / spot / seat",p:"myesto",s:"myesto"},{r:"вечер",e:"evening",p:"vyechyer",s:"vyechyerr"},{r:"мать",e:"mother",p:"mat",s:"mat"},{r:"отец",e:"father",p:"otyets",s:"otyets"},{r:"дочь",e:"daughter",p:"doch",s:"doch"},{r:"сын",e:"son",p:"syn",s:"sin"},{r:"брат",e:"brother",p:"brat",s:"brrat"},{r:"сестра",e:"sister",p:"syestra",s:"syestrra"},{r:"муж",e:"husband",p:"muzh",s:"muzh"},{r:"жена",e:"wife",p:"zhyena",s:"zhyena"},
  {r:"ребёнок",e:"child",p:"ryebyonok",s:"rryebyonok"},{r:"дети",e:"children",p:"dyeti",s:"dyeti"},{r:"семья",e:"family",p:"syemya",s:"syemya"},{r:"друг",e:"friend (masc.)",p:"drug",s:"drrug"},{r:"подруга",e:"friend (fem.)",p:"podruga",s:"podrruga"},{r:"любовь",e:"love",p:"lyubov",s:"lyubov"},{r:"любить",e:"to love / to like",p:"lyubit",s:"lyubit"},{r:"война",e:"war",p:"voyna",s:"voyna"},{r:"мир",e:"world / peace",p:"mir",s:"mirr"},{r:"страна",e:"country",p:"strana",s:"strrana"},
  {r:"город",e:"city",p:"gorod",s:"gorrod"},{r:"улица",e:"street",p:"ulitsa",s:"ulitsa"},{r:"дорога",e:"road / way",p:"doroga",s:"dorroga"},{r:"машина",e:"car / machine",p:"mashina",s:"mashina"},{r:"деньги",e:"money",p:"dyengi",s:"dyengi"},{r:"работать",e:"to work",p:"rabotat",s:"rrabotat"},{r:"видеть",e:"to see",p:"vidyet",s:"vidyet"},{r:"слышать",e:"to hear",p:"slyshat",s:"slishat"},{r:"понять",e:"to understand",p:"ponyat",s:"ponyat"},{r:"найти",e:"to find",p:"nayti",s:"nayti"},
  {r:"уйти",e:"to leave / go away",p:"uyti",s:"uyti"},{r:"открыть",e:"to open",p:"otkryt",s:"otkrrit"},{r:"закрыть",e:"to close",p:"zakryt",s:"zakrrit"},{r:"начать",e:"to begin / start",p:"nachat",s:"nachat"},{r:"помочь",e:"to help",p:"pomoch",s:"pomoch"},{r:"забыть",e:"to forget",p:"zabyt",s:"zabit"},{r:"помнить",e:"to remember",p:"pomnit",s:"pomnit"},{r:"думать",e:"to think",p:"dumat",s:"dumat"},{r:"говорить",e:"to speak / say",p:"govorit",s:"govorrit"},{r:"хотеть",e:"to want",p:"khotyet",s:"jotyet"},
  {r:"мочь",e:"to be able to / can",p:"moch",s:"moch"},{r:"стать",e:"to become / stand",p:"stat",s:"stat"},{r:"дать",e:"to give",p:"dat",s:"dat"},{r:"взять",e:"to take",p:"vzyat",s:"vzyat"},{r:"иметь",e:"to have",p:"imyet",s:"imyet"},{r:"ждать",e:"to wait",p:"zhdat",s:"zhdat"},{r:"жить",e:"to live",p:"zhit",s:"zhit"},{r:"смотреть",e:"to watch / look",p:"smotryet",s:"smotrryet"},{r:"читать",e:"to read",p:"chitat",s:"chitat"},{r:"писать",e:"to write",p:"pisat",s:"pisat"},
  {r:"спать",e:"to sleep",p:"spat",s:"spat"},{r:"пить",e:"to drink",p:"pit",s:"pit"},{r:"ехать",e:"to go (by vehicle)",p:"yekhat",s:"yejat"},{r:"бежать",e:"to run",p:"byezhat",s:"byezhat"},{r:"стоять",e:"to stand",p:"stoyat",s:"stoyat"},{r:"сидеть",e:"to sit",p:"sidyet",s:"sidyet"},{r:"лежать",e:"to lie down",p:"lyezhat",s:"lyezhat"},{r:"войти",e:"to enter / come in",p:"voyti",s:"voyti"},{r:"выйти",e:"to exit / go out",p:"vyyti",s:"viyti"},{r:"встать",e:"to get up",p:"vstat",s:"vstat"},
  {r:"сесть",e:"to sit down",p:"syest",s:"syest"},{r:"бояться",e:"to be afraid / fear",p:"boyatsya",s:"boyatsya"},{r:"верить",e:"to believe",p:"vyerit",s:"vyerrit"},{r:"пройти",e:"to pass / go through",p:"proyti",s:"prroyti"},{r:"ответить",e:"to answer",p:"otvyetit",s:"otvyetit"},{r:"спросить",e:"to ask",p:"sprosit",s:"sprrosit"},{r:"решить",e:"to decide / solve",p:"ryeshit",s:"rryeshit"},{r:"изменить",e:"to change",p:"izmyenit",s:"izmyenit"},{r:"получить",e:"to receive / get",p:"poluchit",s:"poluchit"},{r:"оставить",e:"to leave behind",p:"ostavit",s:"ostavit"},
  {r:"потерять",e:"to lose",p:"potyeryat",s:"potyerryat"},{r:"купить",e:"to buy",p:"kupit",s:"kupit"},{r:"продать",e:"to sell",p:"prodat",s:"prrodat"},{r:"заплатить",e:"to pay",p:"zaplatit",s:"zaplatit"},{r:"принести",e:"to bring",p:"prinyesti",s:"prrinyesti"},{r:"поставить",e:"to put / place",p:"postavit",s:"postavit"},{r:"положить",e:"to put (lying)",p:"polozhit",s:"polozhit"},{r:"убить",e:"to kill",p:"ubit",s:"ubit"},{r:"умереть",e:"to die",p:"umyeryet",s:"umyerryet"},{r:"родиться",e:"to be born",p:"roditsya",s:"rroditsya"},
  {r:"вернуться",e:"to return",p:"vyernutsya",s:"vyerrnutsya"},{r:"оказаться",e:"to turn out",p:"okazatsya",s:"okazatsya"},{r:"остаться",e:"to remain / stay",p:"ostatsya",s:"ostatsya"},{r:"случиться",e:"to happen",p:"sluchitsya",s:"sluchitsya"},{r:"утро",e:"morning",p:"utro",s:"utrro"},{r:"час",e:"hour",p:"chas",s:"chas"},{r:"минута",e:"minute",p:"minuta",s:"minuta"},{r:"секунда",e:"second",p:"syekunda",s:"syekunda"},{r:"неделя",e:"week",p:"nyedyelya",s:"nyedyelya"},{r:"месяц",e:"month",p:"myesyats",s:"myesyats"},
  {r:"конец",e:"end",p:"konyets",s:"konyets"},{r:"начало",e:"beginning",p:"nachalo",s:"nachalo"},{r:"сторона",e:"side",p:"storona",s:"storrona"},{r:"часть",e:"part / portion",p:"chast",s:"chast"},{r:"вещь",e:"thing",p:"vyeshch",s:"vyeshch"},{r:"слово",e:"word",p:"slovo",s:"slovo"},{r:"вопрос",e:"question",p:"vopros",s:"voprros"},{r:"ответ",e:"answer",p:"otvyet",s:"otvyet"},{r:"проблема",e:"problem",p:"problyema",s:"prroblyema"},{r:"история",e:"story / history",p:"istoriya",s:"istorriya"},
  {r:"правило",e:"rule",p:"pravilo",s:"prravilo"},{r:"план",e:"plan",p:"plan",s:"plan"},{r:"цель",e:"goal / aim",p:"tsyel",s:"tsyel"},{r:"результат",e:"result",p:"ryezultat",s:"rryezultat"},{r:"причина",e:"reason / cause",p:"prichina",s:"prrichina"},{r:"способ",e:"way / method",p:"sposob",s:"sposob"},{r:"идея",e:"idea",p:"idyeya",s:"idyeya"},{r:"мысль",e:"thought",p:"mysl",s:"misl"},{r:"чувство",e:"feeling / sense",p:"chuvstvo",s:"chuvstvo"},{r:"тело",e:"body",p:"tyelo",s:"tyelo"},
  {r:"голова",e:"head",p:"golova",s:"golova"},{r:"рука",e:"hand / arm",p:"ruka",s:"rruka"},{r:"нога",e:"leg / foot",p:"noga",s:"noga"},{r:"глаз",e:"eye",p:"glaz",s:"glaz"},{r:"рот",e:"mouth",p:"rot",s:"rrot"},{r:"нос",e:"nose",p:"nos",s:"nos"},{r:"ухо",e:"ear",p:"ukho",s:"ujo"},{r:"сердце",e:"heart",p:"syerdtsye",s:"syerrdtsye"},{r:"лицо",e:"face",p:"litso",s:"litso"},{r:"спина",e:"back",p:"spina",s:"spina"},
  {r:"живот",e:"stomach / belly",p:"zhivot",s:"zhivot"},{r:"кровь",e:"blood",p:"krov",s:"krrov"},{r:"кожа",e:"skin",p:"kozha",s:"kozha"},{r:"волосы",e:"hair",p:"volosy",s:"volosi"},{r:"зуб",e:"tooth",p:"zub",s:"zub"},{r:"палец",e:"finger",p:"palyets",s:"palyets"},{r:"плечо",e:"shoulder",p:"plyecho",s:"plyecho"},{r:"грудь",e:"chest / breast",p:"grud",s:"grrud"},{r:"горло",e:"throat",p:"gorlo",s:"gorrlo"},{r:"большой",e:"big / large (adj)",p:"bolshoy",s:"bolshoy"},
  {r:"маленький",e:"small / little",p:"malyenkiy",s:"malyenkiy"},{r:"хороший",e:"good",p:"khoroshiy",s:"jorroshiy"},{r:"плохой",e:"bad",p:"plokhoy",s:"plojoy"},{r:"старый",e:"old",p:"staryy",s:"starriy"},{r:"молодой",e:"young",p:"molodoy",s:"molodoy"},{r:"красивый",e:"beautiful / handsome",p:"krasivyy",s:"krrasiviy"},{r:"умный",e:"smart / intelligent",p:"umnyy",s:"umniy"},{r:"глупый",e:"stupid / foolish",p:"glupyy",s:"glupiy"},{r:"быстрый",e:"fast / quick",p:"bystryy",s:"bistrriy"},{r:"медленный",e:"slow",p:"myedlyennyy",s:"myedlyenniy"},
  {r:"сильный",e:"strong",p:"silnyy",s:"silniy"},{r:"слабый",e:"weak",p:"slabyy",s:"slabiy"},{r:"тихий",e:"quiet / calm",p:"tikhiy",s:"tijiy"},{r:"громкий",e:"loud",p:"gromkiy",s:"grromkiy"},{r:"тёмный",e:"dark",p:"tyomnyy",s:"tyomniy"},{r:"светлый",e:"light / bright",p:"svyetlyy",s:"svyetliy"},{r:"чистый",e:"clean / pure",p:"chistyy",s:"chistiy"},{r:"грязный",e:"dirty",p:"gryaznyy",s:"grryazniy"},{r:"холодный",e:"cold",p:"kholodnyy",s:"jolodniy"},{r:"горячий",e:"hot",p:"goryachiy",s:"gorryachiy"},
  {r:"тёплый",e:"warm",p:"tyoplyy",s:"tyopliy"},{r:"мокрый",e:"wet",p:"mokryy",s:"mokrriy"},{r:"сухой",e:"dry",p:"sukhoy",s:"sujoy"},{r:"длинный",e:"long",p:"dlinnyy",s:"dlinniy"},{r:"короткий",e:"short",p:"korotkiy",s:"korrotkiy"},{r:"высокий",e:"tall / high",p:"vysokiy",s:"visokiy"},{r:"низкий",e:"low / short",p:"nizkiy",s:"nizkiy"},{r:"широкий",e:"wide / broad",p:"shirokiy",s:"shirrokiy"},{r:"узкий",e:"narrow",p:"uzkiy",s:"uzkiy"},{r:"толстый",e:"thick / fat",p:"tolstyy",s:"tolstiy"},
  {r:"тонкий",e:"thin",p:"tonkiy",s:"tonkiy"},{r:"тяжёлый",e:"heavy / difficult",p:"tyazhyolyy",s:"tyazhyoliy"},{r:"лёгкий",e:"light / easy",p:"lyogkiy",s:"lyogkiy"},{r:"страшный",e:"scary / terrible",p:"strashnyy",s:"strrashniy"},{r:"странный",e:"strange / weird",p:"strannyy",s:"strranniy"},{r:"интересный",e:"interesting",p:"intyeryesnyy",s:"intyerryesniy"},{r:"важный",e:"important",p:"vazhnyy",s:"vazhniy"},{r:"нужный",e:"necessary / needed",p:"nuzhnyy",s:"nuzhniy"},{r:"правый",e:"right / correct",p:"pravyy",s:"prraviy"},{r:"левый",e:"left",p:"lyevyy",s:"lyeviy"},
  {r:"прямой",e:"straight / direct",p:"pryamoy",s:"prryamoy"},{r:"последний",e:"last",p:"poslyedniy",s:"poslyedniy"},{r:"следующий",e:"next",p:"slyeduyushchiy",s:"slyeduyushchiy"},{r:"главный",e:"main / chief",p:"glavnyy",s:"glavniy"},{r:"настоящий",e:"real / present / true",p:"nastoyashchiy",s:"nastoyashchiy"},{r:"разный",e:"different / various",p:"raznyy",s:"rrazniy"},{r:"самый",e:"most / the very",p:"samyy",s:"samiy"},{r:"каждый",e:"each / every",p:"kazhdyy",s:"kazhdiy"},{r:"любой",e:"any / whichever",p:"lyuboy",s:"lyuboy"},{r:"весь",e:"all / entire (masc.)",p:"vyes",s:"vyes"},
  {r:"целый",e:"whole / intact",p:"tsyelyy",s:"tsyeliy"},{r:"единственный",e:"only / sole",p:"yedinstvyennyy",s:"yedinstvyenniy"},{r:"несколько",e:"several / a few",p:"nyeskolko",s:"nyeskolko"},{r:"многие",e:"many (people)",p:"mnogiye",s:"mnogiye"},{r:"некоторые",e:"some / certain",p:"nyekotoryye",s:"nyekotorriye"},{r:"три",e:"three",p:"tri",s:"trri"},{r:"четыре",e:"four",p:"chyetyrye",s:"chyetirrye"},{r:"пять",e:"five",p:"pyat",s:"pyat"},{r:"шесть",e:"six",p:"shyest",s:"shyest"},{r:"семь",e:"seven",p:"syem",s:"syem"},
  {r:"восемь",e:"eight",p:"vosyem",s:"vosyem"},{r:"девять",e:"nine",p:"dyevyat",s:"dyevyat"},{r:"десять",e:"ten",p:"dyesyat",s:"dyesyat"},{r:"двадцать",e:"twenty",p:"dvadtsat",s:"dvadtsat"},{r:"сто",e:"hundred",p:"sto",s:"sto"},{r:"тысяча",e:"thousand",p:"tysyacha",s:"tisyacha"},{r:"потом",e:"then / later",p:"potom",s:"potom"},{r:"сначала",e:"at first / first",p:"snachala",s:"snachala"},{r:"обычно",e:"usually",p:"obychno",s:"obichno"},{r:"часто",e:"often",p:"chasto",s:"chasto"},
  {r:"иногда",e:"sometimes",p:"inogda",s:"inogda"},{r:"редко",e:"rarely / seldom",p:"ryedko",s:"rryedko"},{r:"скоро",e:"soon",p:"skoro",s:"skorro"},{r:"сразу",e:"immediately / at once",p:"srazu",s:"srrazu"},{r:"наконец",e:"finally / at last",p:"nakonyets",s:"nakonyets"},{r:"везде",e:"everywhere",p:"vyezdye",s:"vyezdye"},{r:"нигде",e:"nowhere",p:"nigdye",s:"nigdye"},{r:"туда",e:"there (direction)",p:"tuda",s:"tuda"},{r:"назад",e:"back / ago",p:"nazad",s:"nazad"},{r:"вперёд",e:"forward / ahead",p:"vpyeryod",s:"vpyerryod"},
  {r:"вверх",e:"up / upward",p:"vvyerkh",s:"vvyerrj"},{r:"вниз",e:"down / downward",p:"vniz",s:"vniz"},{r:"рядом",e:"nearby / next to",p:"ryadom",s:"rryadom"},{r:"вокруг",e:"around",p:"vokrug",s:"vokrrug"},{r:"внутри",e:"inside",p:"vnutri",s:"vnutrri"},{r:"снаружи",e:"outside",p:"snaruzhi",s:"snarruzhi"},{r:"далеко",e:"far / far away",p:"dalyeko",s:"dalyeko"},{r:"близко",e:"near / close",p:"blizko",s:"blizko"},{r:"почти",e:"almost / nearly",p:"pochti",s:"pochti"},{r:"совсем",e:"completely / at all",p:"sovsyem",s:"sovsyem"},
  {r:"довольно",e:"quite / rather",p:"dovolno",s:"dovolno"},{r:"слишком",e:"too / too much",p:"slishkom",s:"slishkom"},{r:"достаточно",e:"enough / sufficiently",p:"dostatochno",s:"dostatochno"},{r:"особенно",e:"especially",p:"osobyenno",s:"osobyenno"},{r:"конечно",e:"of course / certainly",p:"konyechno",s:"konyechno"},{r:"наверно",e:"probably",p:"navyerno",s:"navyerrno"},{r:"может быть",e:"maybe / perhaps",p:"mozhyet byt",s:"mozhyet bit"},{r:"действительно",e:"really / indeed",p:"dyeystvityelno",s:"dyeystvityelno"},{r:"возможно",e:"possibly",p:"vozmozhno",s:"vozmozhno"},{r:"именно",e:"exactly / namely",p:"imyenno",s:"imyenno"},
  {r:"лишь",e:"only / merely",p:"lish",s:"lish"},{r:"однако",e:"however / but",p:"odnako",s:"odnako"},{r:"хотя",e:"although / though",p:"khotya",s:"jotya"},{r:"потому что",e:"because",p:"potomu chto",s:"potomu chto"},{r:"так как",e:"since / because",p:"tak kak",s:"tak kak"},{r:"пока",e:"while / until / for now",p:"poka",s:"poka"},{r:"несмотря на",e:"despite",p:"nyesmotrya na",s:"nyesmotrrya na"},{r:"вместо",e:"instead of",p:"vmyesto",s:"vmyesto"},{r:"кроме",e:"except / besides",p:"kromye",s:"krromye"},{r:"благодаря",e:"thanks to",p:"blagodarya",s:"blagodarrya"},
  {r:"из-за",e:"because of / due to",p:"iz-za",s:"iz-za"},{r:"ради",e:"for the sake of",p:"radi",s:"rradi"},{r:"имя",e:"name (first)",p:"imya",s:"imya"},{r:"фамилия",e:"surname / last name",p:"familiya",s:"familiya"},{r:"адрес",e:"address",p:"adryes",s:"adrryes"},{r:"номер",e:"number",p:"nomyer",s:"nomyerr"},{r:"телефон",e:"phone / telephone",p:"tyelyefon",s:"tyelyefon"},{r:"письмо",e:"letter",p:"pismo",s:"pismo"},{r:"книга",e:"book",p:"kniga",s:"kniga"},{r:"газета",e:"newspaper",p:"gazyeta",s:"gazyeta"},
  {r:"журнал",e:"magazine / journal",p:"zhurnal",s:"zhurrnal"},{r:"фото",e:"photo",p:"foto",s:"foto"},{r:"картина",e:"picture / painting",p:"kartina",s:"karrtina"},{r:"фильм",e:"film / movie",p:"film",s:"film"},{r:"музыка",e:"music",p:"muzyka",s:"muzika"},{r:"песня",e:"song",p:"pyesnya",s:"pyesnya"},{r:"игра",e:"game",p:"igra",s:"igrra"},{r:"спорт",e:"sport",p:"sport",s:"sporrt"},{r:"школа",e:"school",p:"shkola",s:"shkola"},{r:"университет",e:"university",p:"univyersityet",s:"univyerrsityet"},
  {r:"урок",e:"lesson",p:"urok",s:"urrok"},{r:"учитель",e:"teacher (masc.)",p:"uchityel",s:"uchityel"},{r:"студент",e:"student (masc.)",p:"studyent",s:"studyent"},{r:"врач",e:"doctor",p:"vrach",s:"vrrach"},{r:"полиция",e:"police",p:"politsiya",s:"politsiya"},{r:"больница",e:"hospital",p:"bolnitsa",s:"bolnitsa"},{r:"магазин",e:"store / shop",p:"magazin",s:"magazin"},{r:"ресторан",e:"restaurant",p:"ryestoran",s:"rryestorran"},{r:"кафе",e:"café",p:"kafye",s:"kafye"},{r:"банк",e:"bank",p:"bank",s:"bank"},
  {r:"офис",e:"office",p:"ofis",s:"ofis"},{r:"комната",e:"room",p:"komnata",s:"komnata"},{r:"кухня",e:"kitchen",p:"kukhnya",s:"kujnya"},{r:"спальня",e:"bedroom",p:"spalnya",s:"spalnya"},{r:"гостиная",e:"living room",p:"gostinaya",s:"gostinaya"},{r:"ванная",e:"bathroom",p:"vannaya",s:"vannaya"},{r:"туалет",e:"toilet / restroom",p:"tualyet",s:"tualyet"},{r:"окно",e:"window",p:"okno",s:"okno"},{r:"дверь",e:"door",p:"dvyer",s:"dvyerr"},{r:"стол",e:"table",p:"stol",s:"stol"},
  {r:"стул",e:"chair",p:"stul",s:"stul"},{r:"кровать",e:"bed",p:"krovat",s:"krrovat"},{r:"диван",e:"sofa / couch",p:"divan",s:"divan"},{r:"лампа",e:"lamp",p:"lampa",s:"lampa"},{r:"телевизор",e:"television / TV",p:"tyelyevizor",s:"tyelyevizorr"},{r:"компьютер",e:"computer",p:"kompyutyer",s:"kompyutyerr"},{r:"ключ",e:"key",p:"klyuch",s:"klyuch"},{r:"замок",e:"lock / castle",p:"zamok",s:"zamok"},{r:"сумка",e:"bag / purse",p:"sumka",s:"sumka"},{r:"куртка",e:"jacket / coat",p:"kurtka",s:"kurrtka"},
  {r:"рубашка",e:"shirt",p:"rubashka",s:"rrubashka"},{r:"брюки",e:"pants / trousers",p:"bryuki",s:"brryuki"},{r:"платье",e:"dress",p:"platye",s:"platye"},{r:"туфли",e:"shoes (dress)",p:"tufli",s:"tufli"},{r:"ботинки",e:"boots / shoes",p:"botinki",s:"botinki"},{r:"пальто",e:"overcoat",p:"palto",s:"palto"},{r:"шапка",e:"hat / cap",p:"shapka",s:"shapka"},{r:"перчатки",e:"gloves",p:"pyerchatki",s:"pyerrchatki"},{r:"очки",e:"glasses / spectacles",p:"ochki",s:"ochki"},{r:"часы",e:"watch / clock",p:"chasy",s:"chasi"},
  {r:"кольцо",e:"ring",p:"koltso",s:"koltso"},{r:"кошелёк",e:"wallet / purse",p:"koshyelyok",s:"koshyelyok"},{r:"паспорт",e:"passport",p:"pasport",s:"pasporrt"},{r:"еда",e:"food",p:"yeda",s:"yeda"},{r:"хлеб",e:"bread",p:"khlyeb",s:"jlyeb"},{r:"мясо",e:"meat",p:"myaso",s:"myaso"},{r:"рыба",e:"fish",p:"ryba",s:"rriba"},{r:"молоко",e:"milk",p:"moloko",s:"moloko"},{r:"вода",e:"water",p:"voda",s:"voda"},{r:"чай",e:"tea",p:"chay",s:"chay"},
  {r:"кофе",e:"coffee",p:"kofye",s:"kofye"},{r:"суп",e:"soup",p:"sup",s:"sup"},{r:"салат",e:"salad",p:"salat",s:"salat"},{r:"фрукты",e:"fruit (pl.)",p:"frukty",s:"frrukti"},{r:"овощи",e:"vegetables",p:"ovoshchi",s:"ovoshchi"},{r:"яблоко",e:"apple",p:"yabloko",s:"yabloko"},{r:"апельсин",e:"orange",p:"apyelsin",s:"apyelsin"},{r:"банан",e:"banana",p:"banan",s:"banan"},{r:"картошка",e:"potato (colloquial)",p:"kartoshka",s:"karrtoshka"},{r:"помидор",e:"tomato",p:"pomidor",s:"pomidorr"},
  {r:"лук",e:"onion",p:"luk",s:"luk"},{r:"чеснок",e:"garlic",p:"chyesnok",s:"chyesnok"},{r:"соль",e:"salt",p:"sol",s:"sol"},{r:"сахар",e:"sugar",p:"sakhar",s:"sajarr"},{r:"масло",e:"butter / oil",p:"maslo",s:"maslo"},{r:"яйцо",e:"egg",p:"yaytso",s:"yaytso"},{r:"сыр",e:"cheese",p:"syr",s:"sirr"},{r:"курица",e:"chicken",p:"kuritsa",s:"kurritsa"},{r:"говядина",e:"beef",p:"govyadina",s:"govyadina"},{r:"свинина",e:"pork",p:"svinina",s:"svinina"},
  {r:"пиво",e:"beer",p:"pivo",s:"pivo"},{r:"вино",e:"wine",p:"vino",s:"vino"},{r:"водка",e:"vodka",p:"vodka",s:"vodka"},{r:"небо",e:"sky",p:"nyebo",s:"nyebo"},{r:"земля",e:"earth / ground / land",p:"zyemlya",s:"zyemlya"},{r:"солнце",e:"sun",p:"solntsye",s:"solntsye"},{r:"луна",e:"moon",p:"luna",s:"luna"},{r:"звезда",e:"star",p:"zvyezda",s:"zvyezda"},{r:"море",e:"sea",p:"morye",s:"morrye"},{r:"река",e:"river",p:"ryeka",s:"rryeka"},
  {r:"озеро",e:"lake",p:"ozyero",s:"ozyerro"},{r:"лес",e:"forest",p:"lyes",s:"lyes"},{r:"гора",e:"mountain",p:"gora",s:"gorra"},{r:"снег",e:"snow",p:"snyeg",s:"snyeg"},{r:"дождь",e:"rain",p:"dozhd",s:"dozhd"},{r:"ветер",e:"wind",p:"vyetyer",s:"vyetyerr"},{r:"огонь",e:"fire",p:"ogon",s:"ogon"},{r:"камень",e:"stone / rock",p:"kamyen",s:"kamyen"},{r:"дерево",e:"tree / wood",p:"dyeryevo",s:"dyerryevo"},{r:"трава",e:"grass",p:"trava",s:"trrava"},
  {r:"цветок",e:"flower",p:"tsvyetok",s:"tsvyetok"},{r:"птица",e:"bird",p:"ptitsa",s:"ptitsa"},{r:"собака",e:"dog",p:"sobaka",s:"sobaka"},{r:"кошка",e:"cat",p:"koshka",s:"koshka"},{r:"лошадь",e:"horse",p:"loshad",s:"loshad"},{r:"корова",e:"cow",p:"korova",s:"korrova"},{r:"волк",e:"wolf",p:"volk",s:"volk"},{r:"медведь",e:"bear",p:"myedvyed",s:"myedvyed"},{r:"лев",e:"lion",p:"lyev",s:"lyev"},{r:"тигр",e:"tiger",p:"tigr",s:"tigrr"},
  {r:"змея",e:"snake",p:"zmyeya",s:"zmyeya"},{r:"самолёт",e:"airplane",p:"samolyot",s:"samolyot"},{r:"поезд",e:"train",p:"poyezd",s:"poyezd"},{r:"корабль",e:"ship",p:"korabl",s:"korrabl"},{r:"автобус",e:"bus",p:"avtobus",s:"avtobus"},{r:"метро",e:"metro / subway",p:"myetro",s:"myetrro"},{r:"велосипед",e:"bicycle",p:"vyelosipyed",s:"vyelosipyed"},{r:"мотоцикл",e:"motorcycle",p:"mototsikl",s:"mototsikl"},{r:"такси",e:"taxi",p:"taksi",s:"taksi"},{r:"лифт",e:"elevator / lift",p:"lift",s:"lift"},
  {r:"красный",e:"red",p:"krasnyy",s:"krrasniy"},{r:"синий",e:"blue (dark)",p:"siniy",s:"siniy"},{r:"голубой",e:"blue (light)",p:"goluboy",s:"goluboy"},{r:"зелёный",e:"green",p:"zyelyonyy",s:"zyelyoniy"},{r:"жёлтый",e:"yellow",p:"zhyoltyy",s:"zhyoltiy"},{r:"оранжевый",e:"orange (color)",p:"oranzhyevyy",s:"orranzhyeviy"},{r:"фиолетовый",e:"purple / violet",p:"fiolyetovyy",s:"fiolyetoviy"},{r:"чёрный",e:"black",p:"chyornyy",s:"chyorrniy"},{r:"белый",e:"white",p:"byelyy",s:"byeliy"},{r:"серый",e:"gray",p:"syeryy",s:"syerriy"},
  {r:"коричневый",e:"brown",p:"korichnyevyy",s:"korrichnyeviy"},{r:"розовый",e:"pink",p:"rozovyy",s:"rrozoviy"},{r:"золотой",e:"golden / gold",p:"zolotoy",s:"zolotoy"},{r:"серебряный",e:"silver",p:"syeryebryanyy",s:"syerryebrryaniy"},{r:"деревянный",e:"wooden",p:"dyeryevyannyy",s:"dyerryevyanniy"},{r:"железный",e:"iron / made of iron",p:"zhyelyeznyy",s:"zhyelyezniy"},{r:"каменный",e:"stone / made of stone",p:"kamyennyy",s:"kamyenniy"},{r:"стеклянный",e:"glass / made of glass",p:"styeklyannyy",s:"styeklyanniy"},{r:"северный",e:"northern",p:"syevyernyy",s:"syevyerrniy"},{r:"южный",e:"southern",p:"yuzhnyy",s:"yuzhniy"},
  {r:"восточный",e:"eastern",p:"vostochnyy",s:"vostochniy"},{r:"западный",e:"western",p:"zapadnyy",s:"zapadniy"},{r:"центральный",e:"central",p:"tsyentralnyy",s:"tsyentrralniy"},{r:"местный",e:"local",p:"myestnyy",s:"myestniy"},{r:"иностранный",e:"foreign",p:"inostrannyy",s:"inostrranniy"},{r:"русский",e:"Russian",p:"russkiy",s:"rrusskiy"},{r:"национальный",e:"national",p:"natsionalnyy",s:"natsionalniy"},{r:"политический",e:"political",p:"politichyeskiy",s:"politichyeskiy"},{r:"экономический",e:"economic",p:"ekonomichyeskiy",s:"ekonomichyeskiy"},{r:"социальный",e:"social",p:"sotsialnyy",s:"sotsialniy"},
  {r:"культурный",e:"cultural",p:"kulturnyy",s:"kulturrniy"},{r:"исторический",e:"historical",p:"istorichyeskiy",s:"istorrichyeskiy"},{r:"военный",e:"military / war",p:"voyennyy",s:"voyenniy"},{r:"медицинский",e:"medical",p:"myeditsinskiy",s:"myeditsinskiy"},{r:"технический",e:"technical",p:"tyekhnichyeskiy",s:"tyejnichyeskiy"},{r:"научный",e:"scientific",p:"nauchnyy",s:"nauchniy"},{r:"религиозный",e:"religious",p:"ryeligioznyy",s:"rryeligiozniy"},{r:"общество",e:"society",p:"obshchyestvo",s:"obshchyestvo"},{r:"государство",e:"state / government",p:"gosudarstvo",s:"gosudarrstvo"},{r:"правительство",e:"government",p:"pravityelstvo",s:"prravityelstvo"},
  {r:"президент",e:"president",p:"pryezidyent",s:"prryezidyent"},{r:"министр",e:"minister",p:"ministr",s:"ministrr"},{r:"закон",e:"law",p:"zakon",s:"zakon"},{r:"право",e:"right / law",p:"pravo",s:"prravo"},{r:"свобода",e:"freedom / liberty",p:"svoboda",s:"svoboda"},{r:"власть",e:"power / authority",p:"vlast",s:"vlast"},{r:"народ",e:"people / nation",p:"narod",s:"narrod"},{r:"армия",e:"army",p:"armiya",s:"arrmiya"},{r:"суд",e:"court",p:"sud",s:"sud"},{r:"тюрьма",e:"prison / jail",p:"tyurma",s:"tyurrma"},
  {r:"преступление",e:"crime",p:"pryestuplyeniye",s:"prryestuplyeniye"},{r:"убийство",e:"murder",p:"ubiystvo",s:"ubiystvo"},{r:"оружие",e:"weapon",p:"oruzhiye",s:"orruzhiye"},{r:"революция",e:"revolution",p:"ryevolyutsiya",s:"rryevolyutsiya"},{r:"экономика",e:"economy",p:"ekonomika",s:"ekonomika"},{r:"бизнес",e:"business",p:"biznyes",s:"biznyes"},{r:"рынок",e:"market",p:"rynok",s:"rrinok"},{r:"цена",e:"price",p:"tsyena",s:"tsyena"},{r:"стоимость",e:"cost / value",p:"stoimost",s:"stoimost"},{r:"прибыль",e:"profit",p:"pribyl",s:"prribil"},
  {r:"налог",e:"tax",p:"nalog",s:"nalog"},{r:"производство",e:"production",p:"proizvodstvo",s:"prroizvodstvo"},{r:"промышленность",e:"industry",p:"promyshlyennost",s:"prromishlyennost"},{r:"образование",e:"education",p:"obrazovaniye",s:"obrrazovaniye"},{r:"наука",e:"science",p:"nauka",s:"nauka"},{r:"технология",e:"technology",p:"tyekhnologiya",s:"tyejnologiya"},{r:"информация",e:"information",p:"informatsiya",s:"inforrmatsiya"},{r:"данные",e:"data",p:"dannyye",s:"danniye"},{r:"система",e:"system",p:"sistyema",s:"sistyema"},{r:"программа",e:"program",p:"programma",s:"prrogrramma"},
  {r:"процесс",e:"process",p:"protsyess",s:"prrotsyess"},{r:"метод",e:"method",p:"myetod",s:"myetod"},{r:"анализ",e:"analysis",p:"analiz",s:"analiz"},{r:"развитие",e:"development",p:"razvitiye",s:"rrazvitiye"},{r:"изменение",e:"change",p:"izmyenyeniye",s:"izmyenyeniye"},{r:"решение",e:"solution / decision",p:"ryeshyeniye",s:"rryeshyeniye"},{r:"возможность",e:"opportunity / possibility",p:"vozmozhnost",s:"vozmozhnost"},{r:"ситуация",e:"situation",p:"situatsiya",s:"situatsiya"},{r:"условие",e:"condition",p:"usloviye",s:"usloviye"},{r:"требование",e:"requirement / demand",p:"tryebovaniye",s:"trryebovaniye"},
  {r:"встреча",e:"meeting / encounter",p:"vstryecha",s:"vstrryecha"},{r:"разговор",e:"conversation / talk",p:"razgovor",s:"rrazgovorr"},{r:"переговоры",e:"negotiations",p:"pyeryegovory",s:"pyerryegovorri"},{r:"соглашение",e:"agreement",p:"soglashyeniye",s:"soglashyeniye"},{r:"договор",e:"contract / treaty",p:"dogovor",s:"dogovorr"},{r:"отношения",e:"relations / relationship",p:"otnoshyeniya",s:"otnoshyeniya"},{r:"связь",e:"connection / communication",p:"svyaz",s:"svyaz"},{r:"контакт",e:"contact",p:"kontakt",s:"kontakt"},{r:"общение",e:"communication",p:"obshchyeniye",s:"obshchyeniye"},{r:"поддержка",e:"support",p:"poddyerzhka",s:"poddyerrzhka"},
  {r:"помощь",e:"help / assistance",p:"pomoshch",s:"pomoshch"},{r:"защита",e:"protection / defense",p:"zashchita",s:"zashchita"},{r:"безопасность",e:"safety / security",p:"byezopasnost",s:"byezopasnost"},{r:"риск",e:"risk",p:"risk",s:"rrisk"},{r:"угроза",e:"threat",p:"ugroza",s:"ugrroza"},{r:"опасность",e:"danger",p:"opasnost",s:"opasnost"},{r:"кризис",e:"crisis",p:"krizis",s:"krrizis"},{r:"конфликт",e:"conflict",p:"konflikt",s:"konflikt"},{r:"успех",e:"success",p:"uspyekh",s:"uspyej"},{r:"победа",e:"victory / win",p:"pobyeda",s:"pobyeda"},
  {r:"поражение",e:"defeat / loss",p:"porazhyeniye",s:"porrazhyeniye"},{r:"достижение",e:"achievement",p:"dostizhyeniye",s:"dostizhyeniye"},{r:"эффект",e:"effect",p:"effyekt",s:"effyekt"},{r:"влияние",e:"influence / impact",p:"vliyaniye",s:"vliyaniye"},{r:"значение",e:"meaning / significance",p:"znachyeniye",s:"znachyeniye"},{r:"роль",e:"role",p:"rol",s:"rrol"},{r:"период",e:"period",p:"pyeriod",s:"pyerriod"},{r:"момент",e:"moment",p:"momyent",s:"momyent"},{r:"случай",e:"case / occasion",p:"sluchay",s:"sluchay"},{r:"событие",e:"event",p:"sobytiye",s:"sobitiye"},
  {r:"факт",e:"fact",p:"fakt",s:"fakt"},{r:"ложь",e:"lie / falsehood",p:"lozh",s:"lozh"},{r:"тайна",e:"secret / mystery",p:"tayna",s:"tayna"},{r:"загадка",e:"riddle / mystery",p:"zagadka",s:"zagadka"},{r:"ошибка",e:"mistake / error",p:"oshibka",s:"oshibka"},{r:"удача",e:"luck / good fortune",p:"udacha",s:"udacha"},{r:"судьба",e:"fate / destiny",p:"sudba",s:"sudba"},{r:"надежда",e:"hope",p:"nadyezhda",s:"nadyezhda"},{r:"мечта",e:"dream (aspiration)",p:"myechta",s:"myechta"},{r:"желание",e:"wish / desire",p:"zhyelaniye",s:"zhyelaniye"},
  {r:"страх",e:"fear",p:"strakh",s:"strraj"},{r:"радость",e:"joy / happiness",p:"radost",s:"rradost"},{r:"грусть",e:"sadness",p:"grust",s:"grrust"},{r:"злость",e:"anger",p:"zlost",s:"zlost"},{r:"ненависть",e:"hatred",p:"nyenavist",s:"nyenavist"},{r:"зависть",e:"envy",p:"zavist",s:"zavist"},{r:"вина",e:"guilt",p:"vina",s:"vina"},{r:"стыд",e:"shame",p:"styd",s:"stid"},{r:"гордость",e:"pride",p:"gordost",s:"gorrdost"},{r:"уважение",e:"respect",p:"uvazhyeniye",s:"uvazhyeniye"},
  {r:"доверие",e:"trust",p:"dovyeriye",s:"dovyerriye"},{r:"честность",e:"honesty",p:"chyestnost",s:"chyestnost"},{r:"справедливость",e:"justice / fairness",p:"spravyedlivost",s:"sprravyedlivost"},{r:"смелость",e:"bravery / courage",p:"smyelost",s:"smyelost"},{r:"трусость",e:"cowardice",p:"trusost",s:"trrusost"},{r:"терпение",e:"patience",p:"tyerpyeniye",s:"tyerrpyeniye"},{r:"упорство",e:"persistence",p:"uporstvo",s:"uporrstvo"},{r:"привычка",e:"habit",p:"privychka",s:"prrivichka"},{r:"характер",e:"character / personality",p:"kharaktyer",s:"jarraktyerr"},{r:"поведение",e:"behavior",p:"povyedyeniye",s:"povyedyeniye"},
  {r:"способность",e:"ability / capability",p:"sposobnost",s:"sposobnost"},{r:"талант",e:"talent",p:"talant",s:"talant"},{r:"навык",e:"skill",p:"navyk",s:"navik"},{r:"знание",e:"knowledge",p:"znaniye",s:"znaniye"},{r:"опыт",e:"experience",p:"opyt",s:"opit"},{r:"память",e:"memory",p:"pamyat",s:"pamyat"},{r:"внимание",e:"attention",p:"vnimaniye",s:"vnimaniye"},{r:"интерес",e:"interest",p:"intyeryes",s:"intyerryes"},{r:"любопытство",e:"curiosity",p:"lyubopytstvo",s:"lyubopitstvo"},{r:"воображение",e:"imagination",p:"voobrazhyeniye",s:"voobrrazhyeniye"},
  {r:"мнение",e:"opinion",p:"mnyeniye",s:"mnyeniye"},{r:"взгляд",e:"view / glance",p:"vzglyad",s:"vzglyad"},{r:"позиция",e:"position",p:"pozitsiya",s:"pozitsiya"},{r:"подход",e:"approach",p:"podkhod",s:"podjod"},{r:"принцип",e:"principle",p:"printsip",s:"prrintsip"},{r:"ценность",e:"value",p:"tsyennost",s:"tsyennost"},{r:"смысл",e:"meaning / sense",p:"smysl",s:"smisl"},{r:"задача",e:"task / problem",p:"zadacha",s:"zadacha"},{r:"трудность",e:"difficulty",p:"trudnost",s:"trrudnost"},{r:"выбор",e:"choice",p:"vybor",s:"viborr"},
  {r:"стратегия",e:"strategy",p:"stratyegiya",s:"strratyegiya"},{r:"контроль",e:"control",p:"kontrol",s:"kontrrol"},{r:"управление",e:"management",p:"upravlyeniye",s:"uprravlyeniye"},{r:"организация",e:"organization",p:"organizatsiya",s:"orrganizatsiya"},{r:"структура",e:"structure",p:"struktura",s:"strrukturra"},{r:"порядок",e:"order",p:"poryadok",s:"porryadok"},{r:"норма",e:"norm / standard",p:"norma",s:"norrma"},{r:"стандарт",e:"standard",p:"standart",s:"standarrt"},{r:"качество",e:"quality",p:"kachyestvo",s:"kachyestvo"},{r:"уровень",e:"level",p:"urovyen",s:"urrovyen"},
  {r:"степень",e:"degree / extent",p:"styepyen",s:"styepyen"},{r:"размер",e:"size",p:"razmyer",s:"rrazmyerr"},{r:"количество",e:"quantity / amount",p:"kolichyestvo",s:"kolichyestvo"},{r:"число",e:"number",p:"chislo",s:"chislo"},{r:"сумма",e:"sum / amount",p:"summa",s:"summa"},{r:"доля",e:"share / portion",p:"dolya",s:"dolya"},{r:"вид",e:"type / view / kind",p:"vid",s:"vid"},{r:"тип",e:"type",p:"tip",s:"tip"},{r:"форма",e:"form / shape",p:"forma",s:"forrma"},{r:"цвет",e:"color",p:"tsvyet",s:"tsvyet"},
  {r:"звук",e:"sound",p:"zvuk",s:"zvuk"},{r:"запах",e:"smell / scent",p:"zapakh",s:"zapaj"},{r:"вкус",e:"taste",p:"vkus",s:"vkus"},{r:"ощущение",e:"sensation / feeling",p:"oshchushchyeniye",s:"oshchushchyeniye"},{r:"восприятие",e:"perception",p:"vospriyatiye",s:"vosprriyatiye"},{r:"впечатление",e:"impression",p:"vpyechatlyeniye",s:"vpyechatlyeniye"},{r:"воспоминание",e:"memory / recollection",p:"vospominaniye",s:"vospominaniye"},{r:"образ",e:"image / figure",p:"obraz",s:"obrraz"},{r:"природа",e:"nature",p:"priroda",s:"prrirroda"},{r:"культура",e:"culture",p:"kultura",s:"kulturra"},
  {r:"традиция",e:"tradition",p:"traditsiya",s:"trraditsiya"},{r:"обычай",e:"custom / tradition",p:"obychay",s:"obichay"},{r:"праздник",e:"holiday / celebration",p:"prazdnik",s:"prrazdnik"},{r:"религия",e:"religion",p:"ryeligiya",s:"rryeligiya"},{r:"вера",e:"faith / belief",p:"vyera",s:"vyerra"},{r:"церковь",e:"church",p:"tsyerkov",s:"tsyerrkov"},{r:"молитва",e:"prayer",p:"molitva",s:"molitva"},{r:"бог",e:"God / god",p:"bog",s:"bog"},{r:"дух",e:"spirit",p:"dukh",s:"duj"},{r:"душа",e:"soul",p:"dusha",s:"dusha"},
  {r:"рай",e:"paradise / heaven",p:"ray",s:"rray"},{r:"ад",e:"hell",p:"ad",s:"ad"},{r:"сон",e:"dream / sleep",p:"son",s:"son"},{r:"рождение",e:"birth",p:"rozhdyeniye",s:"rrozhdyeniye"},{r:"смерть",e:"death",p:"smyert",s:"smyerrt"},{r:"взрослый",e:"adult / grown-up",p:"vzroslyy",s:"vzrrosliy"},{r:"старик",e:"old man",p:"starik",s:"starrik"},{r:"старуха",e:"old woman",p:"starukha",s:"starruja"},{r:"парень",e:"guy / young man",p:"paryen",s:"parryen"},{r:"девушка",e:"girl / young woman",p:"dyevushka",s:"dyevushka"},
  {r:"мальчик",e:"boy",p:"malchik",s:"malchik"},{r:"девочка",e:"girl (child)",p:"dyevochka",s:"dyevochka"},{r:"младенец",e:"baby / infant",p:"mladyenyets",s:"mladyenyets"},{r:"родители",e:"parents",p:"rodityeli",s:"rrodityeli"},{r:"бабушка",e:"grandmother",p:"babushka",s:"babushka"},{r:"дедушка",e:"grandfather",p:"dyedushka",s:"dyedushka"},{r:"внук",e:"grandson",p:"vnuk",s:"vnuk"},{r:"дядя",e:"uncle",p:"dyadya",s:"dyadya"},{r:"тётя",e:"aunt",p:"tyotya",s:"tyotya"},{r:"племянник",e:"nephew",p:"plyemyannik",s:"plyemyannik"},
  {r:"сосед",e:"neighbor (masc.)",p:"sosyed",s:"sosyed"},{r:"коллега",e:"colleague",p:"kollyega",s:"kollyega"},{r:"начальник",e:"boss / chief",p:"nachalnik",s:"nachalnik"},{r:"сотрудник",e:"employee / colleague",p:"sotrudnik",s:"sotrrudnik"},{r:"партнёр",e:"partner",p:"partnyor",s:"parrtnyorr"},{r:"клиент",e:"client / customer",p:"kliyent",s:"kliyent"},{r:"гость",e:"guest",p:"gost",s:"gost"},{r:"хозяин",e:"owner / host",p:"khozyain",s:"jozyain"},{r:"слуга",e:"servant",p:"sluga",s:"sluga"},{r:"помощник",e:"assistant / helper",p:"pomoshchnik",s:"pomoshchnik"},
  {r:"герой",e:"hero",p:"gyeroy",s:"gyerroy"},{r:"враг",e:"enemy",p:"vrag",s:"vrrag"},{r:"солдат",e:"soldier",p:"soldat",s:"soldat"},{r:"офицер",e:"officer",p:"ofitsyer",s:"ofitsyerr"},{r:"генерал",e:"general",p:"gyenyeral",s:"gyenyerral"},{r:"король",e:"king",p:"korol",s:"korrol"},{r:"королева",e:"queen",p:"korolyeva",s:"korrolyeva"},{r:"принц",e:"prince",p:"prints",s:"prrints"},{r:"принцесса",e:"princess",p:"printsyessa",s:"prrintsyessa"},{r:"судья",e:"judge",p:"sudya",s:"sudya"},
  {r:"адвокат",e:"lawyer",p:"advokat",s:"advokat"},{r:"прокурор",e:"prosecutor",p:"prokuror",s:"prrokurrorr"},{r:"преступник",e:"criminal",p:"pryestupnik",s:"prryestupnik"},{r:"свидетель",e:"witness",p:"svidyetyel",s:"svidyetyel"},{r:"жертва",e:"victim",p:"zhyertva",s:"zhyerrtva"},{r:"учёный",e:"scientist / scholar",p:"uchyonyy",s:"uchyoniy"},{r:"художник",e:"artist / painter",p:"khudozhnik",s:"judozhnik"},{r:"актёр",e:"actor",p:"aktyor",s:"aktyorr"},{r:"певец",e:"singer (masc.)",p:"pyevyets",s:"pyevyets"},{r:"писатель",e:"writer",p:"pisatyel",s:"pisatyel"},
  {r:"журналист",e:"journalist",p:"zhurnalist",s:"zhurrnalist"},{r:"инженер",e:"engineer",p:"inzhyenyer",s:"inzhyenyerr"},{r:"водитель",e:"driver",p:"vodityel",s:"vodityel"},{r:"пилот",e:"pilot",p:"pilot",s:"pilot"},{r:"пожарный",e:"firefighter",p:"pozharnyy",s:"pozharrniy"},{r:"повар",e:"cook / chef",p:"povar",s:"povarr"},{r:"продавец",e:"seller / salesperson",p:"prodavyets",s:"prrodavyets"},{r:"строитель",e:"builder / construction worker",p:"stroityel",s:"strroityel"},{r:"фермер",e:"farmer",p:"fyermyer",s:"fyerrmyerr"},{r:"спортсмен",e:"athlete / sportsman",p:"sportsmyen",s:"sporrtsmyen"},
];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

export default function RussianFlashcards() {
  const [filter, setFilter] = useState("all"); // all | learned | unlearned
  const [searchQ, setSearchQ] = useState("");
  const [shuffled, setShuffled] = useState(false);
  const [learned, setLearned] = useState(() => new Set());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [displayWords, setDisplayWords] = useState(WORDS.map((w, i) => ({...w, rank: i+1})));
  const [speaking, setSpeaking] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);

  const speak = useCallback((text) => {
    const synth = synthRef.current;
    if (!synth) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ru-RU";
    utter.rate = 0.85;
    utter.pitch = 1;
    const voices = synth.getVoices();
    const ruVoice = voices.find(v => v.lang.startsWith("ru"));
    if (ruVoice) utter.voice = ruVoice;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    synth.speak(utter);
  }, []);

  const filteredWords = displayWords.filter(w => {
    const matchesFilter = filter === "all" || (filter === "learned" ? learned.has(w.rank) : !learned.has(w.rank));
    const q = searchQ.toLowerCase();
    const matchesSearch = !q || w.r.toLowerCase().includes(q) || w.e.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const card = filteredWords[currentIdx] || null;

  const goNext = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx(i => Math.min(i + 1, filteredWords.length - 1)), flipped ? 150 : 0);
  }, [filteredWords.length, flipped]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setCurrentIdx(i => Math.max(i - 1, 0)), flipped ? 150 : 0);
  }, [flipped]);

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " ") { e.preventDefault(); setFlipped(f => !f); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [goNext, goPrev]);

  useEffect(() => { setCurrentIdx(0); setFlipped(false); }, [filter, searchQ]);

  useEffect(() => {
    if (autoPlay && card) speak(card.r);
  }, [currentIdx, autoPlay]);

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "p" || e.key === "P") { if (card) speak(card.r); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [card, speak]);

  const handleShuffle = () => {
    const shuffledWords = shuffle(WORDS.map((w, i) => ({...w, rank: i+1})));
    setDisplayWords(shuffledWords);
    setShuffled(true);
    setCurrentIdx(0);
    setFlipped(false);
  };

  const handleReset = () => {
    setDisplayWords(WORDS.map((w, i) => ({...w, rank: i+1})));
    setShuffled(false);
    setCurrentIdx(0);
    setFlipped(false);
  };

  const toggleLearned = () => {
    if (!card) return;
    setLearned(prev => {
      const next = new Set(prev);
      if (next.has(card.rank)) next.delete(card.rank);
      else next.add(card.rank);
      return next;
    });
  };

  const learnedCount = learned.size;
  const totalCount = WORDS.length;
  const progress = (learnedCount / totalCount) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Georgia', serif",
      padding: "20px",
      boxSizing: "border-box",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 style={{
          color: "#fff",
          fontSize: "clamp(20px, 4vw, 32px)",
          fontWeight: "700",
          letterSpacing: "2px",
          margin: 0,
          textTransform: "uppercase",
          textShadow: "0 0 30px rgba(167,139,250,0.5)",
        }}>
          🇷🇺 Russian Flash Cards
        </h1>
        <p style={{ color: "#a78bfa", margin: "6px 0 0", fontSize: "14px", letterSpacing: "1px" }}>
          Top 1,000 Words · Hermit Dave Frequency List
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#c4b5fd", fontSize: "13px", marginBottom: "6px" }}>
          <span>Learned: {learnedCount} / {totalCount}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "10px", height: "8px", overflow: "hidden" }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #a78bfa, #818cf8)",
            borderRadius: "10px",
            transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Search + Controls */}
      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          placeholder="Search Russian or English..."
          style={{
            flex: "1 1 200px",
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid rgba(167,139,250,0.4)",
            background: "rgba(255,255,255,0.07)",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
          }}
        />
        {["all", "unlearned", "learned"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "10px 16px",
            borderRadius: "10px",
            border: `1px solid ${filter === f ? "#a78bfa" : "rgba(167,139,250,0.3)"}`,
            background: filter === f ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)",
            color: filter === f ? "#c4b5fd" : "#9ca3af",
            cursor: "pointer",
            fontSize: "13px",
            textTransform: "capitalize",
            transition: "all 0.2s",
          }}>
            {f === "all" ? `All (${totalCount})` : f === "learned" ? `✓ Learned (${learnedCount})` : `📚 Unlearned (${totalCount - learnedCount})`}
          </button>
        ))}
        <button onClick={shuffled ? handleReset : handleShuffle} style={{
          padding: "10px 16px",
          borderRadius: "10px",
          border: "1px solid rgba(167,139,250,0.3)",
          background: shuffled ? "rgba(167,139,250,0.2)" : "rgba(255,255,255,0.05)",
          color: shuffled ? "#c4b5fd" : "#9ca3af",
          cursor: "pointer",
          fontSize: "13px",
          transition: "all 0.2s",
        }}>
          {shuffled ? "↺ Reset" : "🔀 Shuffle"}
        </button>
      </div>

      {/* Card position */}
      {card && (
        <div style={{ color: "#6b7280", fontSize: "13px", marginBottom: "12px" }}>
          Card {currentIdx + 1} of {filteredWords.length}
          {!shuffled && <span style={{ color: "#a78bfa", marginLeft: "8px" }}>Rank #{card.rank}</span>}
        </div>
      )}

      {/* Flashcard */}
      {card ? (
        <div
          onClick={() => setFlipped(f => !f)}
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "260px",
            perspective: "1000px",
            cursor: "pointer",
            marginBottom: "24px",
          }}
        >
          <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}>
            {/* Front - Russian */}
            <div style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))",
              border: "1px solid rgba(167,139,250,0.3)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}>
              <div style={{ color: "#6b7280", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase" }}>
                Russian
              </div>
              <div style={{
                color: "#fff",
                fontSize: "clamp(32px, 8vw, 64px)",
                fontWeight: "700",
                textShadow: "0 0 40px rgba(167,139,250,0.4)",
                letterSpacing: "1px",
              }}>
                {card.r}
              </div>
              <div style={{
                color: "#a78bfa",
                fontSize: "clamp(14px, 3vw, 20px)",
                fontStyle: "italic",
                letterSpacing: "1px",
                opacity: 0.85,
              }}>
                🇬🇧 {card.p}
              </div>
              <div style={{
                color: "#fb923c",
                fontSize: "clamp(14px, 3vw, 20px)",
                fontStyle: "italic",
                letterSpacing: "1px",
                opacity: 0.85,
              }}>
                🇪🇸 {card.s}
              </div>
              <div style={{ color: "#4b5563", fontSize: "12px", letterSpacing: "1px" }}>
                tap or press space to reveal
              </div>
            </div>

            {/* Back - English */}
            <div style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(16,185,129,0.08))",
              border: "1px solid rgba(52,211,153,0.3)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}>
              <div style={{ color: "#6b7280", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase" }}>
                English
              </div>
              <div style={{
                color: "#34d399",
                fontSize: "clamp(22px, 5vw, 38px)",
                fontWeight: "600",
                textAlign: "center",
                padding: "0 30px",
                textShadow: "0 0 30px rgba(52,211,153,0.3)",
              }}>
                {card.e}
              </div>
              <div style={{
                color: "#a78bfa",
                fontSize: "clamp(16px, 3vw, 22px)",
                fontStyle: "italic",
                opacity: 0.8,
              }}>
                {card.r}
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ color: "#a78bfa", fontSize: "clamp(12px, 2vw, 15px)", fontStyle: "italic", opacity: 0.7 }}>
                  🇬🇧 [{card.p}]
                </div>
                <div style={{ color: "#fb923c", fontSize: "clamp(12px, 2vw, 15px)", fontStyle: "italic", opacity: 0.7 }}>
                  🇪🇸 [{card.s}]
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          width: "100%",
          maxWidth: "600px",
          height: "260px",
          border: "1px dashed rgba(167,139,250,0.3)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
          fontSize: "16px",
          marginBottom: "24px",
        }}>
          No cards match your search
        </div>
      )}

      {/* Pronounce + Auto-play row */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
        <button
          onClick={() => card && speak(card.r)}
          disabled={!card || speaking}
          style={{
            padding: "12px 24px",
            borderRadius: "14px",
            border: `1px solid ${speaking ? "rgba(251,191,36,0.6)" : "rgba(251,191,36,0.4)"}`,
            background: speaking ? "rgba(251,191,36,0.2)" : "rgba(251,191,36,0.08)",
            color: speaking ? "#fbbf24" : "#d97706",
            cursor: !card || speaking ? "not-allowed" : "pointer",
            fontSize: "15px",
            letterSpacing: "1px",
            transition: "all 0.2s",
            fontFamily: "'Georgia', serif",
            display: "flex", alignItems: "center", gap: "8px",
            animation: speaking ? "pulse 0.8s ease-in-out infinite" : "none",
          }}
        >
          <span style={{ fontSize: "18px" }}>{speaking ? "🔊" : "🔈"}</span>
          {speaking ? "Playing…" : "Pronounce"}
        </button>

        <button
          onClick={() => setAutoPlay(a => !a)}
          style={{
            padding: "12px 20px",
            borderRadius: "14px",
            border: `1px solid ${autoPlay ? "rgba(52,211,153,0.5)" : "rgba(167,139,250,0.3)"}`,
            background: autoPlay ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)",
            color: autoPlay ? "#34d399" : "#9ca3af",
            cursor: "pointer",
            fontSize: "13px",
            letterSpacing: "1px",
            transition: "all 0.2s",
            fontFamily: "'Georgia', serif",
          }}
        >
          {autoPlay ? "⏸ Auto-play On" : "▶ Auto-play"}
        </button>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "16px" }}>
        <button onClick={goPrev} disabled={currentIdx === 0} style={{
          width: "52px", height: "52px",
          borderRadius: "50%",
          border: "1px solid rgba(167,139,250,0.4)",
          background: currentIdx === 0 ? "rgba(255,255,255,0.03)" : "rgba(167,139,250,0.1)",
          color: currentIdx === 0 ? "#374151" : "#c4b5fd",
          fontSize: "22px",
          cursor: currentIdx === 0 ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>←</button>

        <button onClick={toggleLearned} style={{
          padding: "14px 28px",
          borderRadius: "14px",
          border: `1px solid ${card && learned.has(card.rank) ? "rgba(52,211,153,0.5)" : "rgba(167,139,250,0.4)"}`,
          background: card && learned.has(card.rank) ? "rgba(52,211,153,0.15)" : "rgba(167,139,250,0.1)",
          color: card && learned.has(card.rank) ? "#34d399" : "#c4b5fd",
          cursor: "pointer",
          fontSize: "14px",
          letterSpacing: "1px",
          transition: "all 0.2s",
          fontFamily: "'Georgia', serif",
        }}>
          {card && learned.has(card.rank) ? "✓ Learned" : "Mark Learned"}
        </button>

        <button onClick={goNext} disabled={currentIdx >= filteredWords.length - 1} style={{
          width: "52px", height: "52px",
          borderRadius: "50%",
          border: "1px solid rgba(167,139,250,0.4)",
          background: currentIdx >= filteredWords.length - 1 ? "rgba(255,255,255,0.03)" : "rgba(167,139,250,0.1)",
          color: currentIdx >= filteredWords.length - 1 ? "#374151" : "#c4b5fd",
          fontSize: "22px",
          cursor: currentIdx >= filteredWords.length - 1 ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>→</button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(0.97); }
        }
      `}</style>

      {/* Keyboard hint */}
      <p style={{ color: "#374151", fontSize: "12px", letterSpacing: "1px", textAlign: "center" }}>
        ← → arrow keys to navigate · space to flip · P to pronounce
      </p>
    </div>
  );
}
