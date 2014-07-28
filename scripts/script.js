/**
 * Created with JetBrains PhpStorm.
 * User: SvetlanaLucky
 * Date: 27.07.14
 * Time: 22:32
 * To change this template use File | Settings | File Templates.
 */
var animals = '{"images" :[' +
                            '{ ' +
                            '"name": "cat",' +
                            '"path": "images/cat.png",' +
                            '"description": "The best cat ever",' +
                            '"date": "2014-07-21T09:05:34.540Z"' +
                            '},' +
                            '{' +
                            '"name": "dog",' +
                            '"path": "images/dog.png",' +
                            '"description": "The best dof ever",' +
                            '"date": "2014-07-21T09:06:05.544Z"' +
                            '},' +
                            '{' +
                            '"name": "giraffe",' +
                            '"path": "",' +
                            '"description": "",' +
                            '"date": "2014-07-21T09:07:24.187Z"' +
                            '},' +
                            '{' +
                            '"name": "dinosaur",' +
                            '"path": "images/dinosaur.png",' +
                            '"description": "The best dinosaur ever",' +
                            '"date": "2014-07-21T09:07:47.683Z"' +
                            '}' +
                        ']' +
            '}';
var flowers = '{"images" :[' +
                            '{ ' +
                            '"name": "rose",' +
                            '"path": "images/rose.png",' +
                            '"description": "The best rose ever",' +
                            '"date": "2014-07-21T09:05:34.540Z"' +
                            '},' +
                            '{' +
                            '"name": "violet",' +
                            '"path": "images/violet.png",' +
                            '"description": "The best violet ever",' +
                            '"date": "2014-07-25T09:06:05.544Z"' +
                            '},' +
                            '{' +
                            '"name": "sunflower",' +
                            '"path": "images/sunflower.png",' +
                            '"description": "",' +
                            '"date": "2014-07-23T09:07:24.187Z"' +
                            '},' +
                            '{' +
                            '"name": " camomile",' +
                            '"path": "images/ camomile.png",' +
                            '"description": "The best  camomile ever",' +
                            '"date": "2014-07-21T09:07:47.683Z"' +
                            '}' +
                        ']' +
            '}';

var myGallery=JSON.parse(animals);
var myGalleryFlowers=JSON.parse(flowers);

myGallery.toDate=function(){
    for(var i in this.images){
        var tempData=this.images[i].date;
        this.images[i].date=new Date(tempData);
    }
    console.log("\n----dates parsed to Data object----");
};

myGallery.toDate(); //наверное есть вариант поумнее, но пока так

myGallery.preview=function(){
    console.log("\n----gallery consists of:----");
    for(var i in this.images){
        console.log("\nname",this.images[i].name,
                    "\npath",this.images[i].path,
                    "\ndescription",this.images[i].description,
                    "\ndate",this.images[i].date);
    }
};

var newImg;
newImg = {
    name: "squirrel",
    path: "images/squirrel.png",
    description: "The best squirrel ever",
    date: new Date(Date.now())
};

myGallery.add=function (newImg){
    this.images.push(newImg);
    console.log("\n----Image",newImg.name,"added to gallery----");
    return this; //не факт что нужно
};
myGallery.add(newImg);
myGallery.preview();

myGallery.remove=function (imgForDel){ //добавить проверку существует ли удаляемая картинка
    for(var i in this.images){
        if (this.images[i].name==imgForDel)
            var removeIndex=i;
    }
    if (removeIndex===undefined)
        console.log("\n----Image",imgForDel,"can't be removed from gallery----");
    else    {this.images.splice(removeIndex,1);
            console.log("\n----Image",imgForDel,"removed from gallery----");}
    return this; //не факт что нужно
};

myGallery.remove("monkey");
myGallery.remove("dog");
myGallery.preview();

myGallery.edit=function (imgForEdition, newName, newPath, newDescription, newDate){

    for(var i in this.images){
        if (this.images[i].name==imgForEdition)
            var editIndex=i;
    }
    if (editIndex===undefined)
        console.log("\n----Image",imgForEdition,"can't be edited in gallery----");
    else{
        this.images[editIndex].name=newName||this.images[editIndex].name;
        this.images[editIndex].path=newPath||this.images[editIndex].path;
        this.images[editIndex].description=newDescription||this.images[editIndex].description;
        this.images[editIndex].date=new Date(newDate);
        console.log("\n----Image",imgForEdition,"edited successfully to", this.images[editIndex].name,"----");
    }
    return this; //не факт что нужно
};


myGallery.edit("dog");
myGallery.edit("cat","kitten", "images/cat.png", "The best kitten ever", Date.now());
myGallery.preview();

myGallery.sort = function (fieldSorted){
    this.images.sort(function(arg1, arg2){
        if(arg1[fieldSorted] > arg2[fieldSorted]){
            return 1;
        }
        else if(arg1[fieldSorted] < arg2[fieldSorted]){
            return -1;
        }
            return 0;
    });
};

myGallery.sort("name");
console.log("\n----Gallery sorted by NAME----");
myGallery.preview();
myGallery.sort("date");
console.log("\n----Gallery sorted by DATE----");
myGallery.preview();

//myGallery.filter=function(filerField){
//        for(var i in this.images){
//        if (this.images[i].name==filerField||this.images[i].path==filerField||this.images[i].description==filerField||this.images[i].date==filerField)
//        console.log("\nname",this.images[i].name,
//            "\npath",this.images[i].path,
//            "\ndescription",this.images[i].description,
//            "\ndate",this.images[i].date);
//    }
//    //а как ещё фильтровать? по факту наличия поля что ли?
//};

var filteredGallery;
var c=function compare(fieldName, fieldContent){
    for(var i in this.images){
        return this.images[i].fieldName==fieldContent;
    }
};
myGallery.filter=function(fieldName, fieldContent){
     return this.images.filter(c);
};



console.log("\n----I'm so confused with this filter method T.T----");
filteredGallery=myGallery.filter("description", "The best dinosaur ever");
console.log(filteredGallery);


myGallery.isDescription=function(){

    for(var i in this.images){

        if(!myGallery.images[i].description) {console.log(false);break;}
        else console.log(true);

    }

};
console.log("\n----all images has descriptions? true/false----");
myGallery.isDescription();


//-----------------------JSON--------------------------------

myGallery.serialise=function(){
    return JSON.stringify(this);
};
var serialised=myGallery.serialise();
console.log("\n----after serialisation----");
console.log(serialised);

myGallery.serialiseNames=function(){
    return JSON.stringify(this.images, ["name"]);
};

var serialisedImgNames=myGallery.serialiseNames();
console.log("\n----after serialisation (only names)----");
console.log(serialisedImgNames);


myGallery.serialiseIfPath=function(){
    var str="";
        for(var i in this.images){
            if(!myGallery.images[i].path) continue;
            else  str+=JSON.stringify(this.images[i]);
        }
    return str;
};
var serialisedIfHasPath=myGallery.serialiseIfPath();
console.log("\n----after serialisation (if nas path)----");
console.log(serialisedIfHasPath);

//------------------change context-------------------------

console.log("\n----CHANGE CONTEXT----");
myGallery.preview.call(myGalleryFlowers);

myGalleryFlowers.sort=myGallery.sort.bind(myGalleryFlowers) ;
myGalleryFlowers.sort("name");
myGallery.preview.call(myGalleryFlowers);


myGallery.edit.apply(myGalleryFlowers, ["cat","cat", "images/cat.png", "The best kitten ever", Date.now()]);
myGallery.edit.apply(myGalleryFlowers, ["rose","redRose", "images/redRose.png", "The best flower ever", Date.now()]);
myGallery.preview.call(myGalleryFlowers);

var serialisedFlowers=myGallery.serialise.call(myGalleryFlowers);
console.log("\n----after serialisation----");
console.log(serialisedFlowers);


var serialisedFlowersNames=myGallery.serialiseNames.call(myGalleryFlowers);
console.log("\n----after serialisation (only names)----");
console.log(serialisedFlowersNames);
//myGallery.sort("name");
//console.log("\n----Gallery sorted by NAME----");
//myGallery.preview();
//myGallery.sort("date");
//console.log("\n----Gallery sorted by DATE----");
//myGallery.preview();
