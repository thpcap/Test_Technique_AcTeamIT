$("Document").ready(function(){
    
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

            

            //triage des trains au départ par rapport à l'horaire
            data.depart.sort((a,b)=>{return a.heure.localeCompare(b.heure)})

            //affichage des trains au départ
            data.depart.forEach(train => {
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
            data.arrivees.sort((a,b)=>{return a.heure.localeCompare(b.heure)})
            
            //affichage des trains à l'arrivée
            data.arrivees.forEach(train => {
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
        }
    })
});