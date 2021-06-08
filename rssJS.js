const RSS_URL = 'https://feeds.megaphone.fm/darknetdiaries'

fetch(RSS_URL)
.then(response => response.text())
.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
.then(data => {
    let shows = data.getElementsByTagName("item");
    for(i=0; i < shows.length; i++){
        let show = data.getElementsByTagName("item")[i];
        let title = show.getElementsByTagName("itunes:title").item(0).innerHTML;
        let showNum = show.getElementsByTagName("itunes:episode").item(0).innerHTML;
        let pubDateRaw = new Date(show.getElementsByTagName("pubDate").item(0).innerHTML);
        let pubDate = `${pubDateRaw.getMonth()}/${pubDateRaw.getDate()}/${pubDateRaw.getFullYear()}`;
        let descr = show.getElementsByTagName("description").item(0).innerHTML.split('Sponsors')[0];
        let fileURL = $(show).find("enclosure").attr('url')
        
        $("#podcastList").append(`
        <div class = "episodeTemplate">
            <div class = "upperEpisodeContainer">
                <div class = "showInfoContainer">
                    <li>${showNum}:  ${title}</li>
                    <li>Released: ${pubDate}</li>
                </div>           
                <audio class="player"  data-url ="${fileURL}" preload = "none" controls >
                    <source src = "${fileURL} type = "audio/mp3">
                </audio>
            </div>
            <div class = "lowerEpisodeContainer">
                Description: ${descr}
            </div>
        </div>`)
        }
    });


        