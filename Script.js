$(document).ready(function(){
    
    //lien du fichier trains.json ou de l'endpoint envoyant les informations des trains
    let url="trains.json";

    //badge horloge pour signifier que le train est en retard 
    let lateBadge="<i class=\"fas fa-clock\"></i>";

    //appel ajax pour recupérer train.json et afficher ses donnés
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(data){

            let depart=[]
            let arrivees=[]
            //tri des trains au départ et à l'arrivée et test des donnés
            data.Trains.forEach(element => {
                //verrification de la présance du numéro du train
                if(element.numero==null){
                    erreur("Train sans numéro")
                    return;
                }
                //verrification de la présance de l'horaire du train
                if(element.heure==null){
                    element.heure="";
                }
                //verrification du retard du train
                if(element.retard==null){
                    element.retard="0";
                }
                //verrification de la présance de la provenance ou de la destination
                if(element.provenance==null&&element.destination==null){
                    erreur("Train sans provenance ou destination")
                    return;
                }
                //verrification de la non présance des de la provenance et de la destination en même temps
                if(element.provenance!=null&&element.destination!=null){
                    erreur("Train avec provenance et destination")
                    return;
                }
                // tie des trains entre le départ et l'arrivée
                if(element.provenance!=null){
                    arrivees.push(element);// ajoute dans le tableau arrivée
                }else{
                    depart.push(element);// ajoute dans le tableau départ
                }
            });

            //triage des trains au départ par rapport à l'horaire
            depart.sort((a,b)=>{return a.heure.localeCompare(b.heure)})

            //affichage des trains au départ
            depart.forEach(train => {
                let late="";
                let badge="";
                if (train.retard>0){
                    late="late";
                    badge=lateBadge+`<span> ${train.retard}min</span>`;

                }else{
                    train.retard="";
                }
                $("#Depart tbody").append(
                    `
                     <tr id="${train.numero}" class="${late}">
                        <td>${badge}</td>
                        <td>${train.numero}</td>
                        <td>${train.destination}</td>
                        <td>${train.heure}</td>
                     </tr>
                    `
                    
                )
            });
            
            //triage des trains à l'arrivée par rapport à l'horaire
            arrivees.sort((a,b)=>{return a.heure.localeCompare(b.heure)})
            
            //affichage des trains à l'arrivée
            arrivees.forEach(train => {
                let late="";
                let badge="";
                if (train.retard>0){
                    late="late";
                    badge=lateBadge+`<span> ${train.retard}min</span>`;
                }else{
                    train.retard="";
                }
                $("#Arrivés tbody").append(
                    `
                     <tr id="${train.numero}" class="${late}">
                        <td>${badge}</td>
                        <td>${train.numero}</td>
                        <td>${train.provenance}</td>
                        <td>${train.heure}</td>
                     </tr>
                    `
                    
                )
            });
        },
        error: function(xhr, status, error) {
            //Gestion de l'erreur d'AJAX
            erreur("Erreur AJAX :"+ status+ error);
        }
    });
});

//Fonction à modifier dependant de la demande du client
 function erreur(message){
    console.error(message);
}