let video_main = document.getElementById("show_video_click");
        let main_parent = document.getElementById("yt-thumb");
        async function search_video() {

            show_video_click.innerHTML = null;

            try {
                let search = document.getElementById("search_video").value;
                let get_youtube_api = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${search}&type=video&part=snippet&key=AIzaSyBjN-rVFEPLKlMIkJwgXFozceQceUILCLY&maxResults=10`);

                let data = await get_youtube_api.json();
                // console.log("data ", data);

                let { items } = data;
                // console.log("items ", items);

                items.forEach((video) => {

                    let { id: { videoId } } = video;



                    let { channelTitle, publishedAt } = video.snippet;

                    let { title,description } = video.snippet;

                    let search_parent = document.createElement("div");
                    search_parent.setAttribute("id", "search_parent")

                    let div_1 = document.createElement("div")///iframe video
                    div_1.setAttribute("id", "search_iframe_1");

                    let frame = document.createElement("iframe");
                    frame.src = `https://www.youtube.com/embed/${videoId}`;
                    frame.allow="fullscreen"

                    let div_2 = document.createElement("div");
                    div_2.setAttribute("id", "search_iframe_2");

                    let div_2_child_1 = document.createElement("div");
                    div_2_child_1.innerText=title;
                    let div_2_child_2 = document.createElement("div");
                    div_2_child_2.innerText=channelTitle;
                    let div_2_child_3 = document.createElement("div");
                    div_2_child_3.innerText=description;
                    let div_2_child_4 = document.createElement("div");


                    div_2.append(div_2_child_1, div_2_child_2, div_2_child_3, div_2_child_4);


                    div_1.append(frame);
                    search_parent.append(div_1, div_2)
                    video_main.append(search_parent);



                })


                main_parent.style.visibility = "hidden"
                video_main.style.visibility = "visible"

            }
            catch (err) {
                console.log("err ", err);

            }
        }




        function home() {
            main_parent.style.visibility = "visible"
            video_main.style.visibility = "hidden"
        }






        async function get_video() {

            try {
                let get_youtube_api = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&regionCode=IN&part=snippet&part=statistics&key=AIzaSyBjN-rVFEPLKlMIkJwgXFozceQceUILCLY&maxResults=20`);

                let data = await get_youtube_api.json();
                 console.log("data ", data);

                let { items } = data;

                video_info(items);
            }
            catch (err) {
                console.log("err ", err);

            }

        }
        get_video()


        let video_info = (items) => {
            // console.log("items ", items);


            items.forEach((video) => {

                let { id } = video;

                let { viewCount } = video.statistics;

                let { channelTitle, publishedAt } = video.snippet;

                let { title } = video.snippet.localized;

                let { url } = video.snippet.thumbnails.medium;

                let parent = document.createElement("div");
                parent.setAttribute("id", "sub_parent");

                let div_1 = document.createElement("div");
                div_1.setAttribute("id", "div_1_style")
                let iframe = document.createElement("iframe");
                iframe.src = `https://www.youtube.com/embed/${id}`
                iframe.allow="fullscreen"

                let div_2 = document.createElement("div");
                div_2.setAttribute("id", "div_2_style")
                let div_2_child_1 = document.createElement("div");
                let div_2_child_2 = document.createElement("div");

                // div_2_child_1.innerText = 
                div_2_child_2.innerText = title;

                let div_3 = document.createElement("div");
                div_3.setAttribute("id", "div_3_style")
                div_3.innerHTML = channelTitle;

                let div_4 = document.createElement("div");
                div_4.setAttribute("id", "div_4_style")
                div_4.innerHTML = `${Math.floor(viewCount / 1000)}k views`

                div_2_child_2.append(div_3, div_4)
                div_1.append(iframe);
                div_2.append(div_2_child_1, div_2_child_2);




                parent.append(div_1, div_2);
                main_parent.append(parent)
            })





        }