(this.webpackJsonpftsite=this.webpackJsonpftsite||[]).push([[0],{12:function(e,t,a){e.exports=a(19)},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(11),c=a.n(r),o=a(1),s=a(4),i=a(3),m=a(2),u=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).updateUser=function(e,t,a){n.setState({isLogged:e,username:t,pic:a})},n.onLogClick=function(){n.state.isLogged?(_.updateUser(null),_.changeMainPage("Home")):_.changeMainPage("Login")},n.render=function(){var e=n.state,t=e.isLogged,a=e.username,r=e.pic;return l.a.createElement("header",{className:"subblock boxShow"},l.a.createElement("img",{src:"SitePics/head.png",alt:"[NO LOGO]",className:"logo"}),l.a.createElement("div",{onClick:function(){return _.changeMainPage("Home")},id:"titleArea"},l.a.createElement("h1",{id:"title"},"FoodTracker"),l.a.createElement("h3",{id:"subtitle"},"Define and Track your Food and diet goals on Your own terms!")),l.a.createElement("div",{id:"profileArea",className:"boxShow"},l.a.createElement("span",{onClick:function(){return _.changeMainPage(t?"Profile":"Register")}},a,l.a.createElement("br",null),l.a.createElement("img",{src:"UserPics/".concat(r),alt:"[NO PIC]"})),l.a.createElement("span",{onClick:function(){return _.changeMainPage(t?"Profile":"Register")},className:"navlink"},t?"Profile":"Register"),l.a.createElement("span",{onClick:n.onLogClick,className:"navlink"},t?"Logout":"Login")))},n.state={isLogged:!1,username:_.defaultUser.username,pic:_.defaultUser.pic},n}return a}(l.a.Component),d=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).render=function(){return l.a.createElement("nav",{className:"subblock boxShow"},l.a.createElement("span",{onClick:function(){return _.changeMainPage("DailyMeals")},className:"navlink textHigh"},"Daily Meals"),"|",l.a.createElement("span",{onClick:function(){return _.changeMainPage("YourFood")},className:"navlink textHigh"},"Your Food"),"|",l.a.createElement("span",{onClick:function(){return _.changeMainPage("YourPlans")},className:"navlink textHigh"},"Your Plans"),"|",l.a.createElement("span",{onClick:function(){return _.changeMainPage("YourStats")},className:"navlink textHigh"},"Your Stats"),"|",l.a.createElement("span",{onClick:function(){return _.changeMainPage("GlobalStats")},className:"navlink textHigh"},"Global Stats"),"|",l.a.createElement("span",{onClick:function(){return _.changeMainPage("GlobalData")},className:"navlink textHigh"},"Global Data"))},e}return a}(l.a.Component),E=function(){return l.a.createElement("main",{className:"boxShow"},l.a.createElement("div",{className:"subblock"},l.a.createElement("h1",null,"WELCOME HOME!")))},f=a(7),p=a(5),h=a.n(p),g=a(6),b=(a(18),function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).render=function(){var e=n.state.foodEntry,t=e.foodname,a=e.brand,r=e.amount,c=e.fat,o=e.carbs,s=e.protein,i=e.sizeinfo;return l.a.createElement("div",{className:"foodEntry lineDown"},l.a.createElement("span",{className:"amount"},r),l.a.createElement("span",{className:"name_brand"},"".concat(t," ").concat(a?"@"+a:"")),l.a.createElement("span",{className:"macro"},"".concat(c,"/").concat(o,"/").concat(s)),l.a.createElement("span",{className:"macroRes"},"".concat((c*r/(null===i?1:100)).toFixed(1),"\n                        /").concat((o*r/(null===i?1:100)).toFixed(1),"\n                        /").concat((s*r/(null===i?1:100)).toFixed(1))))},n.defaultFoodEntry={entryid:0,foodid:0,foodname:"Nothing",brand:"Nobody",fat:0,carbs:0,protein:0,sizeinfo:null,userid:0,pic:null,price:0,isdish:!1,noteid:null,amount:1,measure:"Pieces"},n.state={foodEntry:e.foodEntry?e.foodEntry:n.defaultFoodEntry},n}return a}(l.a.Component)),y=function(e){var t=e.grade,a=void 0===t?0:t,n=e.title,r=void 0===n?"Note Title":n,c=e.text,o=void 0===c?"Note text lalalaal lalalalal alaalalal lllaal lalala asdasdsd asdda asdsadssads LA!":c;return l.a.createElement("div",{className:"note boxShow"},l.a.createElement("img",{src:"SitePics/star.png",alt:"[STAR]"+a}),l.a.createElement("div",null,l.a.createElement("span",null,r),l.a.createElement("span",null,o)))},v=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;if(Object(o.a)(this,a),(n=t.call(this,e)).addNewFoodEntry=function(e,t){var a=n.state.foodEntries,r=n.state.foodCounter;a.push(l.a.createElement(b,{foodEntry:t,key:r++})),n.addNewFoodEntryMacros(t),n.setState({foodEntries:a,foodCounter:r,fat:n.state.fat,carbs:n.state.carbs,protein:n.state.protein})},n.toggleHighlight=function(){return n.setState({isHighlighted:!n.state.isHighlighted})},n.toggleMinMax=function(e){n.setState({isMin:!n.state.isMin}),e.stopPropagation()},n.addNewFoodEntryMacros=function(e){var t=n.state,a=t.fat,l=t.carbs,r=t.protein,c=null===e.sizeinfo?1:100;n.state.fat=a+e.fat*e.amount/c,n.state.carbs=l+e.carbs*e.amount/c,n.state.protein=r+e.protein*e.amount/c},n.render=function(){var e=n.state,t=e.mealEntry,a=e.isHighlighted,r=e.isMin,c=e.foodEntries,o=e.fat,i=e.carbs,m=e.protein,u=t.mealname;return l.a.createElement("div",{onClick:function(e){return n.props.selectedChanged(e,Object(s.a)(n))},className:"mealArea boxShow"+(a?" highlight":"")},l.a.createElement("div",{className:"mealTitle"},u,l.a.createElement("img",{onClick:function(e){return n.props.removeMeal(e,Object(s.a)(n))},src:"PLACEHOLDER DROPDOWN",alt:"X"}),l.a.createElement("img",{onClick:n.toggleMinMax,src:"PLACEHOLDER DROPDOWN",alt:r?"+":"-"})),l.a.createElement("hr",null),l.a.createElement(y,null),l.a.createElement("hr",null),l.a.createElement("div",{className:"foodEntries lineDown"+(r?" hidden":"")},c),l.a.createElement("div",{className:"mealTotal"},l.a.createElement("span",null,"Total:"),l.a.createElement("span",null,"".concat(o.toFixed(1),"//").concat(i.toFixed(1),"//").concat(m.toFixed(1)))))},n.componentDidMount=function(){n.props.signalSelect&&n.props.selectedChanged(null,Object(s.a)(n))},n.defaultMealEntry={mealname:"New Meal",portion:1,noteid:null,foodentries:[]},n.state={mealEntry:e.mealEntry?e.mealEntry:n.defaultMealEntry,foodEntries:[],foodCounter:0,selectedFoodEntry:null,isHighlighted:!1,isMin:!1,fat:0,carbs:0,protein:0},e.mealEntry){var r,c=Object(f.a)(e.mealEntry.foodentries);try{for(c.s();!(r=c.n()).done;){var i=r.value;n.state.foodEntries.push(l.a.createElement(b,{foodEntry:i,key:n.state.foodCounter++})),n.addNewFoodEntryMacros(i)}}catch(m){c.e(m)}finally{c.f()}}return n}return a}(l.a.Component),N=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).toggleSelected=function(){return n.setState({isSelected:!n.state.isSelected})},n.render=function(){var e=n.state,t=e.foodItem,a=e.isSelected,r=t.foodname,c=t.brand,o=t.fat,i=t.carbs,m=t.protein,u=t.sizeinfo;return l.a.createElement("div",{onClick:function(e){return n.props.selectedChanged(e,Object(s.a)(n))},className:"foodItem lineDown"+(a?" feSelected":"")},l.a.createElement("span",{className:"name_brand"},"".concat(r," ").concat(c?"@"+c:"")),l.a.createElement("span",{className:"macro"},"".concat(o,"/").concat(i,"/").concat(m)),l.a.createElement("span",{className:"per"},null===u?"1":"100g"))},n.componentDidMount=function(){n.props.signalSelect&&n.props.selectedChanged(null,Object(s.a)(n))},n.defaultFoodItem={entryid:0,foodid:0,foodname:"Nothing",brand:"Nowhere",fat:0,carbs:0,protein:0,sizeinfo:null,userid:0,pic:null,price:0,isdish:!1,noteid:null,measure:"Pieces"},n.state={foodItem:e.foodItem?e.foodItem:n.defaultFoodItem,isSelected:!1},n}return a}(l.a.Component),S=a(8),w=function(){return S.serverLink},M=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onCommit=Object(g.a)(h.a.mark((function e(){var t,a,l,r,c,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state,a=t.dayEntry,l=t.selectedDay,r=0===_.state.currentUser.userid?1:_.state.currentUser.userid,(c=a).userid=r,c.date=l,e.next=7,fetch(w()+"/dailymeals",{method:"put",headers:{"content-type":"application/json"},body:JSON.stringify(c)});case 7:return o=e.sent,e.next=10,o.json();case 10:o=e.sent,alert("Successfully entered date for day ".concat(l,"!\n --You can view resulting entry in the console")),console.log(o);case 13:case"end":return e.stop()}}),e)}))),n.getDailyMeals=Object(g.a)(h.a.mark((function e(){var t,a,r,c,o,s,i,m,u;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.state,a=t.mealCounter,r=t.selectedDay,c=0===_.state.currentUser.userid?1:_.state.currentUser.userid,e.next=4,fetch(w()+"/dailymeals",{method:"get",headers:{"content-type":"application/json",reqdate:document.querySelector("#selectedDay")?document.querySelector("#selectedDay").value:r,userid:c}});case 4:return o=e.sent,e.next=7,o.json();case 7:o=e.sent,n.setState({mealEntries:[],selectedMeal:null}),s=!0,i=Object(f.a)(o.meals);try{for(i.s();!(m=i.n()).done;)u=m.value,s?(n.state.mealEntries.push(l.a.createElement(v,{signalSelect:!0,selectedChanged:n.onSelectedMealChanged,removeMeal:n.onRemoveMeal,mealEntry:u,key:a++})),s=!1):n.state.mealEntries.push(l.a.createElement(v,{selectedChanged:n.onSelectedMealChanged,removeMeal:n.onRemoveMeal,mealEntry:u,key:a++}))}catch(d){i.e(d)}finally{i.f()}n.setState({selectedDay:document.querySelector("#selectedDay").value,dayEntry:o,mealCounter:a});case 13:case"end":return e.stop()}}),e)}))),n.getSFoodItems=Object(g.a)(h.a.mark((function e(){var t,a,r,c,o,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=0===_.state.currentUser.userid?1:_.state.currentUser.userid,e.next=3,fetch(w()+"/dailymeals/foodsearch",{method:"get",headers:{"content-type":"application/json",userid:t,search:document.querySelector(".search")?document.querySelector(".search").value:"",isall:!!document.querySelector("#isAll")&&document.querySelector("#isAll").checked}});case 3:return a=e.sent,e.next=6,a.json();case 6:a=e.sent,n.setState({sFoodItems:[],selectedSFoodItem:null}),r=!0,c=Object(f.a)(a);try{for(c.s();!(o=c.n()).done;)s=o.value,r?(n.state.sFoodItems.push(l.a.createElement(N,{signalSelect:!0,selectedChanged:n.onSelectedSFoodItemChanged,foodItem:s,key:s.foodid})),r=!1):n.state.sFoodItems.push(l.a.createElement(N,{selectedChanged:n.onSelectedSFoodItemChanged,foodItem:s,key:s.foodid}))}catch(i){c.e(i)}finally{c.f()}n.setState({sFoodItems:n.state.sFoodItems});case 12:case"end":return e.stop()}}),e)}))),n.onAddNewMeal=function(e){var t=n.state,a=t.mealEntries,r=t.dayEntry,c=t.selectedMeal,o=n.state.mealCounter;c?a.push(l.a.createElement(v,{selectedChanged:n.onSelectedMealChanged,removeMeal:n.onRemoveMeal,key:o++})):a.push(l.a.createElement(v,{signalSelect:!0,selectedChanged:n.onSelectedMealChanged,removeMeal:n.onRemoveMeal,key:o++})),r.meals.push({key:o-1,mealname:"New Meal",portion:1,noteid:null,foodentries:[]}),n.setState({mealEntries:a,mealCounter:o,dayEntry:r})},n.onRemoveMeal=function(e,t){var a=n.state,l=a.selectedMeal,r=a.mealEntries,c=a.dayEntry;c.meals=c.meals.filter((function(e){return!(e.mealid&&e.mealid===t.state.mealEntry.mealid||e.key==t._reactInternalFiber.key)})),n.setState({mealEntries:r.filter((function(e){return e.key!==t._reactInternalFiber.key})),dayEntry:c}),null!==l&&l===t&&n.setState({selectedMeal:null}),e.stopPropagation()},n.onSelectedMealChanged=function(e,t){var a=n.state.selectedMeal;t!==a&&(a&&a.toggleHighlight(),t.toggleHighlight(),n.setState({selectedMeal:t}))},n.onAddNewFoodEntry=function(e){var t=n.state,a=t.selectedMeal,l=t.selectedSFoodItem,r=t.dayEntry;if(null===a)alert("Must select a Meal !");else if(null===l)alert("Must select a Food Item !");else{var c=document.querySelector(".amountSize"),o=l.state.foodItem;if(""===c.value)o.amount=null===o.sizeinfo?1:100;else{if(isNaN(c.value))return alert("Must Enter Valid Number for Amount!"),void(c.value="");o.amount=c.value}o.measure=null===o.sizeinfo?"Pieces":"Grams",a.addNewFoodEntry(e,o);var s,i=Object(f.a)(r.meals);try{for(i.s();!(s=i.n()).done;){var m=s.value;(m.mealid&&a.state.mealEntry.mealid===m.mealid||a._reactInternalFiber.key==m.key)&&m.foodentries.push(o)}}catch(u){i.e(u)}finally{i.f()}c.value="",n.setState({dayEntry:r})}},n.onSelectedSFoodItemChanged=function(e,t){var a=n.state.selectedSFoodItem;t!==a&&(a&&a.toggleSelected(),t.toggleSelected(),n.setState({selectedSFoodItem:t}))},n.render=function(){var e=n.state.mealEntries;return l.a.createElement("main",{className:"mainDailyMeals boxShow"},l.a.createElement("div",{id:"dayArea",className:"subblock boxShow"},l.a.createElement("div",{className:"dayHeader"},l.a.createElement("div",{className:"datepick boxShow"},l.a.createElement("label",{className:"textHigh"},"Day: "),l.a.createElement("button",{className:"ftButton"},"<"),l.a.createElement("input",{onChange:n.getDailyMeals,id:"selectedDay",type:"date"}),l.a.createElement("button",{className:"ftButton"},">")),l.a.createElement("hr",null),l.a.createElement(y,null),l.a.createElement("hr",null)),l.a.createElement("div",{className:"mealsArea"},e),l.a.createElement("div",{className:"dayAreaButtons"},l.a.createElement("button",{onClick:n.onCommit,className:"ftButton"},"COMMIT DAY!"),l.a.createElement("button",{onClick:n.onAddNewMeal,className:"newMeal ftButton"},"NEW MEAL"))),l.a.createElement("div",{id:"searchArea",className:"subblock boxShow"},l.a.createElement("div",{className:"searchInput boxShow"},l.a.createElement("label",{className:"textHigh"},"Search Food: "),l.a.createElement("input",{onChange:n.getSFoodItems,id:"isAll",type:"checkbox"})," ALL Food",l.a.createElement("input",{className:"search",onChange:n.getSFoodItems,type:"text",placeholder:"search terms"})),l.a.createElement("div",{className:"searchResults boxShow"},n.state.sFoodItems),l.a.createElement("div",{className:"amountInput boxShow"},l.a.createElement("label",{className:"textHigh"},"Amount: "),l.a.createElement("input",{className:"amountSize",type:"text",placeholder:"100"}),l.a.createElement("select",{disabled:!0},l.a.createElement("option",null,"Grams"),l.a.createElement("option",null,"Pieces"))),l.a.createElement("div",{className:"buffer"}),l.a.createElement("div",{className:"searchEntry boxShow"},l.a.createElement("label",{className:"textHigh lineDown"},"Current Entry:"),l.a.createElement(b,null),l.a.createElement("button",{onClick:n.onAddNewFoodEntry,className:"ftButton"},"ADD TO MEAL"))),l.a.createElement("div",{id:"foodDetailsArea",className:"subblock boxShow"},l.a.createElement("div",{className:"foodDetailsHeader"},l.a.createElement("div",{className:"textHigh boxShow"},"cottage cheese @delaco"),l.a.createElement("hr",null),l.a.createElement(y,null),l.a.createElement("hr",null)),l.a.createElement("div",{className:"foodPic boxShow"},l.a.createElement("img",{src:"FoodPics/cottage cheese @delaco.jpg",alt:"[NO FOOD PIC]"})),l.a.createElement("div",{className:"foodInfo"},l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Name"),l.a.createElement("td",{colSpan:"2"},"Cottage Cheese")),l.a.createElement("tr",null,l.a.createElement("th",null,"Brand"),l.a.createElement("td",{colSpan:"2"},"Delaco")),l.a.createElement("tr",null,l.a.createElement("th",null,"Macro"),l.a.createElement("th",null,"100g"),l.a.createElement("th",null,"1(175g)"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"Fat"),l.a.createElement("td",null,"4.5g"),l.a.createElement("td",null,"7.9g")),l.a.createElement("tr",null,l.a.createElement("td",null,"Carbs"),l.a.createElement("td",null,"2g"),l.a.createElement("td",null,"3.5g")),l.a.createElement("tr",null,l.a.createElement("td",null,"Protein"),l.a.createElement("td",null,"12g"),l.a.createElement("td",null,"21g")),l.a.createElement("tr",null,l.a.createElement("td",null,"Calories"),l.a.createElement("td",null,"96.5Kc"),l.a.createElement("td",null,"169.1Kc")),l.a.createElement("tr",null,l.a.createElement("td",null,"Price"),l.a.createElement("td",null,"2.57Lei"),l.a.createElement("td",null,"4.5Lei")))),l.a.createElement("div",{className:"buffer"}),l.a.createElement("div",{className:"foodEntries boxShow"},l.a.createElement("label",{className:"textHigh lineDown"},"Composition:"),l.a.createElement(b,{amount:"2",name_brand:"avocado",macros:"1/1/1",macrores:"2/2/2"}),l.a.createElement(b,{amount:"2",name_brand:"avocado",macros:"1/1/1",macrores:"2/2/2"}),l.a.createElement(b,null)))))},n.componentDidMount=function(){document.querySelector("#selectedDay").value=n.state.selectedDay},n.state={selectedDay:k(new Date),dayEntry:{},sFoodItems:[],mealEntries:[],mealCounter:0,selectedMeal:null,selectedSFoodItem:null,selectedFoodEntry:l.a.createRef()},n.getDailyMeals(),n.getSFoodItems(),n}return a}(l.a.Component),k=function(e){return"".concat(e.getFullYear(),"-").concat(e.getMonth()+1>10?(e.getMonth()+1).toString():"0"+(e.getMonth()+1).toString(),"-").concat(e.getDate()>10?e.getDate().toString():"0"+e.getDate().toString())},x=M,C=function(){return l.a.createElement("main",{className:"boxShow"},l.a.createElement("div",{className:"subblock"},l.a.createElement("h1",null,"YOUR FOOD!")))},O=function(){return l.a.createElement("main",{className:"boxShow"},l.a.createElement("div",{className:"subblock"},l.a.createElement("h1",null,"YOUR PLANS!")))},D=function(){return l.a.createElement("main",{className:"boxShow"},l.a.createElement("div",{className:"subblock"},l.a.createElement("h1",null,"YOUR STATS!")))},P=function(){return l.a.createElement("main",{className:"boxShow"},l.a.createElement("div",{className:"subblock"},l.a.createElement("h1",null,"GLOBAL STATS!")))},F=function(){return l.a.createElement("main",{className:"boxShow"},l.a.createElement("div",{className:"subblock"},l.a.createElement("h1",null,"GLOBAL DATA!")))},j=(a(9),function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).render=function(){var e=n.state.user;return l.a.createElement("main",{className:"mainRegLog boxShow"},l.a.createElement("div",{id:"regform",className:"subblock boxShow"},l.a.createElement("h1",{className:"lineDown"},"User Profile !"),l.a.createElement("div",{className:"fields"},l.a.createElement("span",null,"Username: ",e.username),l.a.createElement("span",null,"Email: ",e.email),l.a.createElement("span",null,"First Name: ",e.firstname),l.a.createElement("span",null,"Last Name: ",e.lastname),l.a.createElement("span",null,"Date Of Birth: ",e.dob),l.a.createElement("span",null,"Sex: ","1"===e.sex?"Male":"Female"),l.a.createElement("div",{className:"personal"},l.a.createElement("div",null,l.a.createElement("img",{src:"UserPics/".concat(e.pic),alt:"[NO PIC]"}),l.a.createElement("br",null),l.a.createElement("button",null,"Browse")),l.a.createElement("div",null,l.a.createElement("span",null,"Short Description:"),l.a.createElement("br",null),l.a.createElement("textarea",{readOnly:!0,value:e.describe}))),l.a.createElement("span",null,"Meal Plans: ",e.defaultmeals),l.a.createElement("span",null,"Diet Plans? "))))},n.state={user:_.state.currentUser},n}return a}(l.a.Component)),L=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onLogin=function(){var e=Object(g.a)(h.a.mark((function e(t){var a,l,r,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.preventDefault(),a=document.querySelectorAll("#logform input"),l=a[0].value,r=a[1].value,e.next=7,fetch(S.serverLink+"/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:l,pass:r})});case 7:if(200!==(c=e.sent).status){e.next=15;break}return e.next=11,c.json();case 11:"string"===typeof(c=e.sent)?n.setState({warningMsg:c}):(_.updateUser(c),_.changeMainPage("Profile")),e.next=20;break;case 15:return e.t0=console,e.next=18,c.json();case 18:e.t1=e.sent,e.t0.log.call(e.t0,e.t1);case 20:e.next=25;break;case 22:e.prev=22,e.t2=e.catch(0),console.log("___________ERROR___________\n",e.t2.message);case 25:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(t){return e.apply(this,arguments)}}(),n.render=function(){return l.a.createElement("main",{className:"mainRegLog boxShow"},l.a.createElement("form",{onSubmit:n.onLogin,id:"logform",className:"subblock boxShow"},l.a.createElement("h1",{className:"lineDown"},"Enter Username/Email and Password to Login!"),l.a.createElement("div",{className:"fields"},l.a.createElement("span",null,"Username/Email: "),l.a.createElement("input",{type:"text",name:"username"}),l.a.createElement("span",null,"Password: "),l.a.createElement("input",{type:"password",name:"password"}),l.a.createElement("span",null,"Remember Me? ",l.a.createElement("input",{type:"checkbox",name:"member"})),l.a.createElement("span",{className:null===n.state.warningMsg?"hidden":"warning"},n.state.warningMsg),l.a.createElement("input",{className:"ftButton",type:"submit",value:"Login"})),l.a.createElement("div",{className:"loglinks"},l.a.createElement("span",{onClick:function(){return _.changeMainPage("Home")}},"Forgot Password?"),l.a.createElement("span",{onClick:function(){return _.changeMainPage("Register")}},"New here? Go Register!"))))},n.state={warningMsg:null},n}return a}(l.a.Component),I=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).onRegister=function(e){e.preventDefault()},e.render=function(){return l.a.createElement("main",{className:"mainRegLog boxShow"},l.a.createElement("form",{onClick:e.onRegister,id:"regform",className:"subblock boxShow"},l.a.createElement("h1",{className:"lineDown"},"Please Complete ALL fields to Register!"),l.a.createElement("div",{className:"fields"},l.a.createElement("span",null,"Username: "),l.a.createElement("input",{type:"text",name:"username"}),l.a.createElement("span",{className:"warning"},"How DARE You, Sir!"),l.a.createElement("span",null,"Email:")," ",l.a.createElement("input",{type:"email",name:"email"}),l.a.createElement("span",null,"Password: "),l.a.createElement("input",{type:"password",name:"password"}),l.a.createElement("span",{className:"detail"},"Password must be at least 6characters long and have both numbers and letters!"),l.a.createElement("span",null,"Confirm Password: "),l.a.createElement("input",{type:"password",name:"cpass"}),l.a.createElement("span",null,"First Name: "),l.a.createElement("input",{type:"text",name:"firstname"}),l.a.createElement("span",null,"Last Name: "),l.a.createElement("input",{type:"text",name:"lastname"}),l.a.createElement("span",null,"Date Of Birth: "),l.a.createElement("input",{type:"date",name:"dob"}),l.a.createElement("div",null,l.a.createElement("span",null,"Sex: "),l.a.createElement("input",{type:"radio",name:"sex",value:"male"}),l.a.createElement("span",null,"Male "),l.a.createElement("input",{type:"radio",name:"sex",value:"female"}),l.a.createElement("span",null,"Female")),l.a.createElement("div",{className:"personal"},l.a.createElement("div",null,l.a.createElement("img",{src:"UserPics/profileEmpty.png",alt:"[NO PIC]"}),l.a.createElement("br",null),l.a.createElement("button",null,"Browse")),l.a.createElement("div",null,l.a.createElement("span",null,"Short Description:"),l.a.createElement("br",null),l.a.createElement("textarea",{placeholder:"Say who you are in a few short phrases.."}))),l.a.createElement("span",null,"Diet Plans?"),l.a.createElement("select",null,l.a.createElement("option",null,"Paleo"),l.a.createElement("option",null,"Keto"),l.a.createElement("option",null,"Mediterranian"),l.a.createElement("option",null,"Vegan"),l.a.createElement("option",null,"Carnivore"),l.a.createElement("option",null,"Low Carb"),l.a.createElement("option",null,"Low Fat"),l.a.createElement("option",null,"PSMF")),l.a.createElement("span",{className:"detail"},"-Pick a Diet from list if any of them apply to You - Can always change it later!"),l.a.createElement("span",{className:"detail"},"(This Choice is simply for tracking stats - Will Not affect results &recommendations)"),l.a.createElement("input",{className:"ftButton",type:"submit",value:"Register"}))))},e}return a}(l.a.Component),A=function(){return l.a.createElement("main",{className:"boxShow"},l.a.createElement("div",{className:"subblock"},l.a.createElement("h1",null,"Error! Page does not exist!")))},R=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).changePage=function(e){n.state.page!==e&&n.setState({page:e})},n.render=function(){switch(n.state.page){case"Home":return l.a.createElement(E,null);case"DailyMeals":return l.a.createElement(x,null);case"YourFood":return l.a.createElement(C,null);case"YourPlans":return l.a.createElement(O,null);case"YourStats":return l.a.createElement(D,null);case"GlobalStats":return l.a.createElement(P,null);case"GlobalData":return l.a.createElement(F,null);case"Profile":return l.a.createElement(j,null);case"Register":return l.a.createElement(I,null);case"Login":return l.a.createElement(L,null);default:return l.a.createElement(A,null)}},n.state={page:e.page?e.page:"Home"},n}return a}(l.a.Component),H=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).render=function(){return l.a.createElement("footer",{className:"subblock boxShow"},l.a.createElement("h3",{id:"author"},"--Made by Rotariu Stefan",l.a.createElement("sub",null," - StravoS")))},e}return a}(l.a.Component),U={main:l.a.createRef(),footer:l.a.createRef(),header:l.a.createRef(),nav:l.a.createRef()},_=null,Y=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).updateUser=function(e){var t=Object(s.a)(n).defaultUser;null===e?(n.setState({currentUser:t}),U.header.current.updateUser(!1,t.username,t.pic)):(n.setState({currentUser:e}),U.header.current.updateUser(!0,e.username,e.pic))},n.changeMainPage=function(e){return U.main.current.changePage(e)},n.render=function(){return[l.a.createElement(u,{ref:U.header,key:"H"}),l.a.createElement(d,{ref:U.nav,key:"N"}),l.a.createElement(R,{ref:U.main,page:"Home",key:"M"}),l.a.createElement(H,{ref:U.footer,key:"F"})]},n.defaultUser={userid:0,username:"Guest",email:"guest@nomail.none",firstname:"John",lastname:"Doe",dob:new Date,sex:1,describe:"placeholder",pic:"profileEmpty.png",default_meals:"Breakfast,Lunch,Dinner",access:"Guest"},n.state={currentUser:n.defaultUser},_=Object(s.a)(n),n}return a}(l.a.Component);c.a.render(l.a.createElement(Y,null),document.querySelector("#root"))},8:function(e){e.exports=JSON.parse('{"serverLink":"https://tranquil-citadel-37714.herokuapp.com"}')},9:function(e,t,a){}},[[12,1,2]]]);
//# sourceMappingURL=main.1cb45d21.chunk.js.map