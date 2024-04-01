const query = document.getElementById("searchInput")
var skinList = []

fetch("https://valorant-api.com/v1/weapons/skins?language=ko-KR").then(req => req.json())
.then(json => {
    //console.log(json.data)
    //const filteredArr = json.data.filter(item => item.displayName.includes('챔피언스'));
    //console.log(filteredArr);

    for (let index = 0; index < json.data.length; index++) {
        const element = json.data[index];
        //console.log(element.levels)

        let skinData = {
            name: element.displayName,
            levels: element.levels,
            icon: element.displayIcon,
            chromas: element.chromas,
            uuid: element.uuid,
        }

        skinList.push(skinData)
    }
}).then(() => {
    //console.log(skinList[0])
    resetList()
})

const findSkinQuery = () =>  {
    if (query.value.trim() == '') {
        resetList()
    }else {
        const filteredArr = skinList.filter(item => item.name.includes(query.value));
        skins.innerHTML = ""

        //console.log(filteredArr);

        filteredArr.forEach(element => {
            skins.innerHTML += `<div class="card" onclick="levelShow('${element.uuid}')" style="background-image: url('${element.icon}'); background-size: cover;"><div class="card-body">${element.name}</div></div>`
        });
    }
}

const resetList = () => {
    skins.innerHTML =""
    for (let index = 0; index < 20; index++) {
        skins.innerHTML += `<div class="card" onclick="levelShow('${skinList[index].uuid}')" style="background-image: url('${skinList[index].icon}'); background-size: cover;"><div class="card-body">${skinList[index].name}</div></div>`
    }
}



const levelShow = (uuid) => {
    skinlevel.innerHTML = ""
    skinvid.innerHTML = ""
    skinTitle.innerHTML = ""
    $("#skinModal").modal('show');
    $("#skinModal").on("hidden.bs.modal", function () {
        skinvid.innerHTML = ""
    });


    fetch("https://valorant-api.com/v1/weapons/skins/" + uuid + "?language=ko-KR").then(res => res.json())
    .then(json => {
        console.log(json)
        skinTitle.innerHTML = json.data.displayName;

        json.data.levels.forEach((elem, index) => {
            $("#skinlevel").append(`<li class="page-item"><a class="page-link lv-${index + 1}" onclick="videoShow('${elem.streamedVideo}', '${elem.displayIcon}')">${index + 1}</a></li>`)
        })
    })    
}

const videoShow = (url, skinimg) => {
    skinvid.innerHTML = ""
    if (url == "null") {
        $("#skinvid").append(`<img src="${skinimg}">`)
        console.log(skinimg)
    } else {
        $("#skinvid").append(`<video autoplay width="465"><source src="${url}" type="video/mp4"><strong>Your browser does not support the video tag.</strong></video>`)
    }
}
