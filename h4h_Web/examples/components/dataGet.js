function get_request(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var dataGet = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET","http:192.168.1.3:55555",true);
  xhttp.send();
}

get_request();
