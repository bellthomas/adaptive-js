/* Library initialisation */
registerNSMethod(uk.org.adaptive, "init", (
    function(properties) {
        console.log(properties);
        var requireAuth = true;
        var hasAuth = false;
        var userMode = false;

        var setCookie = (cname, cvalue, exdays) => {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        var getCookie = (cname) => {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        var userID = getCookie("ADAPTIVE_A");
        var styleID = getCookie("ADAPTIVE_B");

        if(window.location.hash) {
            // Check for auth return
            var obj = window.atob(window.location.hash.substr(1, window.location.hash.length - 1));
            console.log(obj);
        }

        if (verifyArgs(properties, [["id", STRINGTYPE]]) && properties["id"] != "") {
            requireAuth = false;
            setCookie("ADAPTIVE_B", properties["id"], 365);
        } else if (styleID != "") {
            requireAuth = false;
            userMode = false;
        } else if (userID != "") {
            requireAuth = false;
            userMode = true;
        } else {
            requireAuth = true;
        }


        if(requireAuth) {
            // Run run auth
            // Will redirect away
            var elt = document.createElement("div");
            elt.style.cssText = "position: fixed;bottom: 0;z-index: 999999;width: 100%;background-color: aliceblue;padding: 10px;";

            var link = document.createElement("a");
            link.innerHTML = "Login";
            link.href = "https://google.com";
            elt.appendChild(link);

            document.body.appendChild(elt);

            link.addEventListener("click", function(event){
                event.preventDefault();
                var lastIndex = window.location.href.indexOf('#');
                if(lastIndex > -1) var url = window.location.href.substr(0, lastIndex);
                else var url = window.location.href;
                var pageData = JSON.stringify({
                    "redirect_url": url,
                    "time": Date.now(),
                    "hostname": window.location.hostname
                });
                window.location.replace("https://html.adaptive.org.uk/login.php#" + window.btoa(pageData));
            });

            return false;
        }

        if(userMode) {
            // get style from user default style url
        }

        else {
            // get style from style route
        }

        /* Initialise from Style JSON */
        uk.org.adaptive.linkHighlighter.apply({colour: "yellow"});

        return true;
    }
));


/* Shall we begin? */
uk.org.adaptive.init({id:""});
