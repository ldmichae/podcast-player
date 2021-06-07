const RSS_URL = 'https://feeds.megaphone.fm/darknetdiaries'

// fetch(RSS_URL)
//     .then(response => response.text())
//     .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
//     .then(data => {
//         let show = data.getElementsByTagName("item")[0];
//         let title = show.getElementsByTagName("itunes:title")[0].innerHTML;
//         let showNum = show.getElementsByTagName("itunes:episode")[0].innerHTML;
//         let pubDate = show.getElementsByTagName("pubDate")[0].innerHTML;
//         let descr = show.getElementsByTagName("description")[0].innerHTML;
//         console.log(show);
//         console.log(`${showNum}: ${title}`);
//         console.log(pubDate);
//         console.log(descr);
//         console.log($(show).find("enclosure").attr('url'));
//     });

    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let shows = data.getElementsByTagName("item");
        for(i=0; i < shows.length; i++){
            let show = data.getElementsByTagName("item")[i];
            let title = show.getElementsByTagName("itunes:title").item(0).innerHTML;
            let showNum = show.getElementsByTagName("itunes:episode").item(0).innerHTML;
            let pubDate = show.getElementsByTagName("pubDate").item(0).innerHTML;
            let descr = show.getElementsByTagName("description").item(0).innerHTML.split('Sponsors')[0];
            let fileURL = $(show).find("enclosure").attr('url')
            console.log(show);
            console.log(`${showNum}: ${title}`);
            console.log(pubDate);
            console.log(descr);
            console.log(fileURL);
            $("#podcastList").append(`<a href="${fileURL}" download="${showNum}-${title}.mp3">${title}</a><audio style = "width: 700px" controls width = "1000" height = "1000">
                                        <source src="${fileURL}" type = "audio/mp3">
                                      </audio> <br/>`)
        };
            
    });