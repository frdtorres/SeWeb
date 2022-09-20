String.prototype.transformaCaracteresEspeciales = function() {
	return unescape(escape(this).replace(/%0A/g, '<br/>').replace(/%3C/g, '&lt;').replace(/%3E/g, '&gt;'));
}

window.onload = function(){
	var recurso = document.getElementById('recurso').value;
	document.getElementById('enviar').onclick = cargaContenido;
	document.getElementById('calcular').onclick = cargaEstados;
	var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true
		});
}

function cargaContenido(){
	document.getElementById('contenidos').innerHTML = "";
	var recurso = document.getElementById('recurso').value;
	var i;
	var j;
	for(i=1;i<=recurso; i++){
		var campos = campos + i;
		var NvoCampo= document.createElement("div");
		NvoCampo.id= "divcampo_"+(campos);
		NvoCampo.innerHTML="<input type=\"text\" id=\"recurso"+i+"\" size=\"20\" placeholder=\"Ingresa dato Nro: "+i+"\"/><br />";
		var contenedor= document.getElementById("contenidos");
		contenedor.appendChild(NvoCampo);
	}
	if(window.XMLHttpRequest){
		peticion = new XMLHttpRequest();
	}
	else{
		peticion = new ActiveXObject("Microsoft.XMLHTTP");
	}
	peticion.onreadystatechange = muestraContenido;
	tiempoInicial = new Date();
	var recurso = document.getElementById('recurso').value;
	peticion.open('GET', recurso+'?nocache='+Math.random(), true);
	peticion.send(null);
	}	

function cargaEstados(){
	var recurso = parseInt(document.getElementById('recurso').value);
	document.getElementById('total').innerHTML = recurso;
	var i;
	var j;
	datos=new Array(recurso);
	for(i=1; i<=recurso; i++){
		datos[i] = parseInt(document.getElementById('recurso'+i).value);
	}

	console.log(datos);

	for (var z=1; z < recurso+1; z++) {
		var temp = datos[z];
		var j = z-1;
		while (j >= 0 && datos[j] > temp) {
			datos[j + 1] = datos[j];
			j--;
		}
		datos[j+1] = temp;
	}
	document.getElementById('ordenados').innerHTML = "";
	for(i=1; i<=recurso; i++){
		var campos = campos + i;
		var NvoCampo= document.createElement("div");
		NvoCampo.id= "divcampo_"+(campos);
		NvoCampo.innerHTML=datos[i];
		var contenedor= document.getElementById("ordenados");
		contenedor.appendChild(NvoCampo);
	}
	document.getElementById('inferior').innerHTML = datos[1];
	document.getElementById('superior').innerHTML =datos[recurso];
	var rango=(datos[recurso]-datos[1]);
	document.getElementById('rango').innerHTML =rango;
	var a=(Math.log(recurso)/Math.log(10));
	var numaprox=(1+(33/10)*a);
	var x=(parseInt(numaprox)-1);
	document.getElementById('intervalos').innerHTML =x;
	cont=new Array(x);
	for(j=1; j<=x; j++){
		cont[j]=0;
	}
	var b=(parseInt(numaprox)-1);
	var amplitud=(rango/b);
	var z=Math.ceil(amplitud);
	document.getElementById('amplitud').innerHTML =z;
	var rangoc=(Math.ceil(amplitud)*parseInt(numaprox))/2;
	document.getElementById('r_corregido').innerHTML =(parseInt(rangoc));
	var c=((rango-rangoc)/2);
	var lic=(datos[1]-c);
	document.getElementById('li_corregido').innerHTML =(lic);
	var lsc=(datos[recurso]+c);
	document.getElementById('ls_corregido').innerHTML =lsc;
	lidc=new Array(x);
	lsdc=new Array(x);
	var temp=lic;
	var temp2;

	document.getElementById('l_clase').innerHTML = "";
	for(i=1; i<=x; i++){
		lidc[i]=temp;
		var campos = campos + i;
		var NvoCampo= document.createElement("div");
		NvoCampo.id= "divcampo_"+(campos);
		temp2=lidc[i];
		lsdc[i]=temp2+z;
		NvoCampo.innerHTML="clase ("+[i]+"): "+lidc[i]+" - "+lsdc[i];
		var contenedor= document.getElementById("l_clase");
		contenedor.appendChild(NvoCampo);
		temp=lsdc[i];
	}
	for(j=1; j<=x; j++){
		for(i=1;i<=recurso; i++){
 			if(datos[i]>lidc[j] && datos[i]<lsdc[j]) cont[j]++;
 		}
	}

	marcas=new Array(x);
	document.getElementById('marcas_cl').innerHTML = "";
	for(i=1; i<=x; i++){
		var campos = campos + i;
		var NvoCampo= document.createElement("div");
		NvoCampo.id= "divcampo_"+(campos);
		marcas[i]=((lidc[i]+lsdc[i])/2);
		NvoCampo.innerHTML=marcas[i];
		var contenedor= document.getElementById("marcas_cl");
		contenedor.appendChild(NvoCampo);
	}
	document.getElementById('absolutas').innerHTML = "";
	for(j=1; j<=x; j++){
		var campos = campos + i;
		var NvoCampo= document.createElement("div");
		NvoCampo.id= "divcampo_"+(campos);
		NvoCampo.innerHTML=cont[j];
		var contenedor= document.getElementById("absolutas");
		contenedor.appendChild(NvoCampo);
	}
	contre=new Array(x);
	document.getElementById('relativas').innerHTML = "";
	for(j=1; j<=x; j++){
		var campos = campos + i;
		contre[j]=(cont[j]/recurso);
		var NvoCampo= document.createElement("div");
		NvoCampo.id= "divcampo_"+(campos);
		NvoCampo.innerHTML=contre[j];
		var contenedor= document.getElementById("relativas");
		contenedor.appendChild(NvoCampo);
	}
	var mediaa=0;
	for(j=1; j<=x; j++){
		mediaa=mediaa+(marcas[j]*contre[j]);
	}
	document.getElementById('mediari').innerHTML = mediaa;
	var mayor=cont[1];
	var aux1;
	for(j=1; j<=x; j++){
		if(mayor < cont[j]){
 			mayor=cont[j];
		}
	}
	for(j=1; j<=x; j++){
		if(mayor==cont[j]){
 			aux1=j;
			break;
		}
	}
	var aux2=(cont[aux1]-cont[aux1-1]);
	var aux3=((cont[aux1]-cont[aux1-1])+(cont[aux1]-cont[aux1+1]));
	var aux4=(aux2/aux3);
	var aux5=(aux4*(lsdc[aux1]-lidc[aux1]));
	var moda=(lidc[aux1]+aux5);
	document.getElementById('lamoda').innerHTML =moda;
	if(window.XMLHttpRequest) {
		peticion = new XMLHttpRequest();
	}
	else {
	}
	
}
	var barChartData = {

		labels : [ "intervalo 1", "intrvalo 2"],
			
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [12.4,12,12,12,12,12,12]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : [12,12,12,12,12,12,12]
			}
		]

	};


