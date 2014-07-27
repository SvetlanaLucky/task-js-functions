/**
 * Created with JetBrains PhpStorm.
 * User: SvetlanaLucky
 * Date: 27.07.14
 * Time: 22:32
 * To change this template use File | Settings | File Templates.
 */
var data = '{"images" :[' +
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
                            '"path": "images/giraffe.png",' +
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

var myGalleryObject=JSON.parse(data);


myGalleryObject.toDate=function(){
    for(var i in this.images){
        var tempData=this.images[i].date;
        this.images[i].date=new Date(tempData);
    }
    console.log("\ndates parsed to Data object");
};

myGalleryObject.toDate(); //наверное есть вариант поумнее, но пока так

myGalleryObject.preview=function(){
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
    date: new Date("2014-07-21T09:06:05.544Z")
};

myGalleryObject.add=function (newImg){
    this.images.push(newImg);
    console.log("/nImage",newImg.name,"added to gallery");
    return this; //не факт что нужно
};
myGalleryObject.add(newImg);
myGalleryObject.preview();

myGalleryObject.remove=function (imgForDel){ //добавить проверку существует ли удаляемая картинка
    for(var i in this.images){
        if (this.images[i].name==imgForDel)
            var removeIndex=i;
    }
    if (removeIndex===undefined)
        console.log("\nImage",imgForDel,"can't be removed from gallery");
    else    {this.images.splice(removeIndex,1);
            console.log("\nImage",imgForDel,"removed from gallery");}
    return this; //не факт что нужно
};

myGalleryObject.remove("monkey");
myGalleryObject.remove("dog");
myGalleryObject.preview();

myGalleryObject.edit=function (imgForEdition, newName, newPath, newDescription, newDate){

    for(var i in this.images){
        if (this.images[i].name==imgForEdition)
            var editIndex=i;
    }
    if (editIndex===undefined)
        console.log("\nImage",imgForEdition,"can't be edited in gallery");
    else{
        this.images[editIndex].name=newName||this.images[editIndex].name;
        this.images[editIndex].path=newPath||this.images[editIndex].path;
        this.images[editIndex].description=newDescription||this.images[editIndex].description;
        this.images[editIndex].date=new Date(newDate);
        console.log("\nImage",imgForEdition,"edited successfully to", this.images[editIndex].name);
    }
    return this; //не факт что нужно
};



myGalleryObject.edit("dog");
myGalleryObject.edit("cat","kitten", "images/cat.png", "The best kitten ever", Date.now());
myGalleryObject.preview();

