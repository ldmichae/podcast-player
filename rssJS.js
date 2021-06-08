const RSS_URL1 = 'https://feeds.megaphone.fm/darknetdiaries'
const RSS_URL2 = 'https://www.omnycontent.com/d/playlist/9b7dacdf-a925-4f95-84dc-ac46003451ff/662ff2d4-9b7f-4388-8a94-acb8002fd595/480aa1a5-4ada-4846-ae18-acb8002fd59e/podcast.rss'

function populatePodcasts(RSS_URL){
    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let shows = data.getElementsByTagName("item");
        for(i=0; i < shows.length; i++){
            let show = data.getElementsByTagName("item")[i];
            let title = show.getElementsByTagName("itunes:title").item(0).innerHTML;
            
            let showNum = ''
            if (show.getElementsByTagName("itunes:episode").item(0) !== null){
                showNum += (': ',show.getElementsByTagName("itunes:episode").item(0).innerHTML)
            }
            

            let pubDateRaw = new Date(show.getElementsByTagName("pubDate").item(0).innerHTML);
            let pubDate = `${pubDateRaw.getMonth()}/${pubDateRaw.getDate()}/${pubDateRaw.getFullYear()}`;
            let descr = show.getElementsByTagName("itunes:summary").item(0).innerHTML.split('Sponsors')[0];
            let fileURL = $(show).find("enclosure").attr('url')
            
            $("#podcastList").append(`
            <div class = "episodeTemplate">
                <div class = "upperEpisodeContainer">
                    <div class = "showInfoContainer">
                        <li>${showNum} ${title}</li>
                        <li>Released: ${pubDate}</li>
                    </div>           
                    <audio class="player" preload = "none" controls >
                        <source src = "${fileURL} type = "audio/mp3">
                    </audio>
                </div>
                <div class = "lowerEpisodeContainer">
                    Description: ${descr}
                </div>
            </div>`)
            }
        });
    };

    function populatePodcastsReverse(RSS_URL){
        fetch(RSS_URL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            let shows = data.getElementsByTagName("item");
            for(i=0; i < shows.length; i++){
                let show = data.getElementsByTagName("item")[i];
                let title = show.getElementsByTagName("itunes:title").item(0).innerHTML;
                
                let showNum = ''
                if (show.getElementsByTagName("itunes:episode").item(0) !== null){
                    showNum += (': ',show.getElementsByTagName("itunes:episode").item(0).innerHTML)
                }
                
    
                let pubDateRaw = new Date(show.getElementsByTagName("pubDate").item(0).innerHTML);
                let pubDate = `${pubDateRaw.getMonth()}/${pubDateRaw.getDate()}/${pubDateRaw.getFullYear()}`;
                let descr = show.getElementsByTagName("itunes:summary").item(0).innerHTML.split('Sponsors')[0];
                let fileURL = $(show).find("enclosure").attr('url')
                
                $("#podcastList").prepend(`
                <div class = "episodeTemplate">
                    <div class = "upperEpisodeContainer">
                        <div class = "showInfoContainer">
                            <li>${showNum} ${title}</li>
                            <li>Released: ${pubDate}</li>
                        </div>           
                        <audio class="player" preload = "none" controls >
                            <source src = "${fileURL} type = "audio/mp3">
                        </audio>
                    </div>
                    <div class = "lowerEpisodeContainer">
                        Description: ${descr}
                    </div>
                </div>`)
                }
            });
        };

    window.onload=function(){
        let currentShow = null
        let direction = "forward"
        $("#showOne").click(function(){
            direction = "forward";
            $("#podcastList").empty();
            populatePodcasts(RSS_URL1);
            currentShow = RSS_URL1
        });
        $("#showTwo").click(function(){
            direction = "forward";
            $("#podcastList").empty();
            populatePodcasts(RSS_URL2);
            currentShow= RSS_URL2
        })
        $("#reverseOrder").click(function(){
            $("#podcastList").empty();
            if (direction == "forward"){
                populatePodcastsReverse(currentShow);
                direction = 'reverse';
            }
            else if (direction == "reverse"){
                populatePodcasts(currentShow);
                direction = 'forward';
            };
        })
    };
