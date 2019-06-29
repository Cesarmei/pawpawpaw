/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var contacts = [];

 function loaddb(){
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(localStorage.contactosXML, "text/xml");
    
    var names = xmlDoc.getElementsByTagName("Name");
    var email = xmlDoc.getElementsByTagName("Email");
    var dob = xmlDoc.getElementsByTagName("DOB");
    var contactos = xmlDoc.getElementsByTagName("contacto");
    //var isfav = xmlDoc.getElementsByTagName("contacto").getAttribute("Group");
    var pais = xmlDoc.getElementsByTagName("Pais");
    var telef = xmlDoc.getElementsByTagName("Numero");
    var face = xmlDoc.getElementsByTagName("Facebook");
    var goog = xmlDoc.getElementsByTagName("Google");
    var link = xmlDoc.getElementsByTagName("LinkedIn");
    var ins = xmlDoc.getElementsByTagName("Instagram");
    var oth = xmlDoc.getElementsByTagName("Other");
    var obs = xmlDoc.getElementsByTagName("Obs");
    var test=0;
    for(var i = 0; i < names.length; i++) {
        contacts.push({
            
            Name: names[i].childNodes[0].nodeValue,
            Email: email[i].childNodes[0].nodeValue,
            DOB : dob[i].childNodes[0].nodeValue,
            ISFAV :contactos[i].getAttribute("ISFAV"),
            Pais : pais[i].childNodes[0].nodeValue,
            Telef : telef[i].childNodes[0].nodeValue,
            Social : [" "," "," "," "," "],
            Group : contactos[i].getAttribute("Group"),
            Obs : obs[i].childNodes[0].nodeValue
           
        });
        test++;
        for(var j=0;j<5;j++){
            if(j===0){
                if(face[i].childNodes[0].nodeValue===""){
                    contacts[i].Social[0]= "empty";
                }else{
                contacts[i].Social[0]=face[i].childNodes[0].nodeValue;
                } 
            }    
            if(j===1){
                if(goog[i].childNodes[0].nodeValue.length===0){
                    contacts[i].Social[1]=" ";
                }else{
                    contacts[i].Social[1]=goog[i].childNodes[0].nodeValue;
                }
            }
            if(j===2){
                if(link[i].childNodes[0].nodeValue.length===0){
                    contacts[i].Social[2]=" ";
                }else{
                    contacts[i].Social[2]=link[i].childNodes[0].nodeValue; 
                }     
            }
            if(j===3){
                if(ins[i].childNodes[0].nodeValue===0){
                    contacts[i].Social[3]=" ";
                }else{
                    contacts[i].Social[3]=ins[i].childNodes[0].nodeValue;
                }    
            }
            if(j===4){
                if(oth[i].childNodes[0].nodeValue.length===0){
                    contacts[i].Social[4]=" ";
                }else{
                   contacts[i].Social[4]=oth[i].childNodes[0].nodeValue; 
                }
                 
            }
        }
        
    }
   
    list();
        
};

 function adicionarContacto(contacto) {
       var str="<contacto Group=\"" + contacto.Group + "\" ISFAV=\"" + contacto.ISFAV + "\">\n\
                <Name>" + contacto.Name + "</Name>\n\
                <Email>" + contacto.Email + "</Email>\n\
                <DOB>" + contacto.DOB + "</DOB>\n\
                <Telefone>\n\
                    <Pais>" + contacto.Pais + "</Pais>\n\
                    <Numero>" + contacto.Telef + "</Numero>\n\
                </Telefone> \n\
                <Social>\n\
                    <Facebook>"+contacto.Social[0]+"</Facebook>\n\
                    <Google>"+contacto.Social[1]+"</Google>\n\
                    <Instagram>"+contacto.Social[2]+"</Instagram>\n\
                    <LinkedIn>"+contacto.Social[3]+"</LinkedIn>\n\
                    <Other>"+contacto.Social[4]+"</Other>\n\
                </Social>\n\
                <Obs> "+contacto.Obs+"</Obs>\n\
            </contacto>";
    saveToLocalDatabase(str);
    
}

function saveToLocalDatabase(text) {
    if (typeof (Storage) !== "undefined")
    {
        localStorage.contactosXML = localStorage.contactosXML + text;
    }else
    {
        alert("Erro ao guardar!");
    }
}

function info(){
    var x =parseInt(this.value);
    localStorage.indice=x;
    window.location.href="info.html";
}

function delet(){
    var x=parseInt(this.value);
    
    contacts.splice(x, 1);
    
   localStorage.clear();
   localStorage.contactosXML="<contactos>";
    
    for(var i=0;i < contacts.length;i++){
      adicionarContacto(contacts[i]);
               
    }
    localStorage.contactosXML+="</contactos>";
    alert("Contacto Removido!!");
    window.location.reload();

}
function edit(){
    var x =parseInt(this.value);
    localStorage.indice=x;
    window.location.href="edit.html";
}

function makefav(){
    var x=parseInt(this.value);
    var isfav= JSON.parse(contacts[x].ISFAV);
    
    if(isfav === false){
        
        contacts[x].ISFAV= true;
        
    }else{
        
        contacts[x].ISFAV= false;
    }
    
   localStorage.clear();
   localStorage.contactosXML="<contactos>";
    
    for(var i=0;i < contacts.length;i++){
      adicionarContacto(contacts[i]);
               
    }
    localStorage.contactosXML+="</contactos>";
    window.location.reload();

}

function pesq(){
    
    localStorage.inputpesq=document.getElementById('pesquisa').value;
    window.location.href="pesq.html";
}

function list(){
     
    for(var i=0;i<contacts.length;i++){
        
        var name = document.createElement("b");
        var t = document.createTextNode("Nome: ");
        name.appendChild (t);

        var para = document.createElement("P"); 
        t = document.createTextNode(contacts[i].Name); 
        para.appendChild(name);
        para.appendChild(t);
        para.id="cont_text";

        
        var mail = document.createElement("b");
        t = document.createTextNode("Numero: ");
        mail.appendChild(t);
        var para2 = document.createElement("P");
        t = document.createTextNode(contacts[i].Telef);
        para2.appendChild(mail);
        para2.appendChild(t);
        para2.id="cont_text";
        

        var btn_fav = document.createElement("button");
        btn_fav.id="fav";
        btn_fav.value=i;
        btn_fav.addEventListener('click',makefav);
        var img_fav = document.createElement("img");
        var x = JSON.parse(contacts[i].ISFAV);
        if(x === false){
            
            img_fav.src="img/blank_star.png";
        }else{
            img_fav.src="img/yellow_star.png";
        }
        
        img_fav.alt="Error 404";
        btn_fav.appendChild(img_fav);
        
        
        
        var img= document.createElement("img");
        img.src="img/user.png";
        img.id="user";
        img.alt="Error 404";
        
        
        
        var btn_edt = document.createElement("button");
        btn_edt.addEventListener('click',edit);
        var img_edt=document.createElement("img");
        img_edt.src="img/edit.png";
        img_edt.alt="Error 404";
        btn_edt.value=i;
        btn_edt.id="edit";
        btn_edt.appendChild(img_edt);
        
        var btn_rmv = document.createElement("button");
        btn_rmv.addEventListener('click',delet);
        var img_rmv = document.createElement("img");
        img_rmv.src="img/delete.png";
        img_rmv.alt="Error 404";
        btn_rmv.value=i;
        btn_rmv.id="rmv";
        btn_rmv.appendChild(img_rmv);
        
        var btn_info = document.createElement("button");
        btn_info.addEventListener('click',info);
        var img_info = document.createElement("img");
        img_info.src="img/info.png";
        img_info.alt="Error 404";
        btn_info.value=i;
        btn_info.id="info";
        btn_info.appendChild(img_info);
        
        
        var sect = document.createElement("section");
        sect.id="contact";
        sect.appendChild(img);
        sect.appendChild(btn_fav);
        //sect.appendChild(name);
        sect.appendChild(para);
        //sect.appendChild(mail);
        sect.appendChild(para2);
        sect.appendChild(btn_rmv);
        sect.appendChild(btn_edt);
        sect.appendChild(btn_info);
        document.getElementById("content").appendChild(sect);
    }
    
}


function init(){
    
    document.getElementById('content').addEventListener('load', loaddb());
    
    document.getElementById('pesq').addEventListener('click', pesq);
}

document.addEventListener('DOMContentLoaded', init);


