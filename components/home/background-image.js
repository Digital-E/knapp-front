import { useEffect, useRef } from "react";

const Component = ({ hasLoaded, loadProgress }) => {
    let imageRef = useRef();
    let img = null;



    useEffect(() => {
        Image.prototype.load = function(url){
            var thisImg = this;
            var xmlHTTP = new XMLHttpRequest();
            xmlHTTP.open('GET', url, true);
            xmlHTTP.responseType = 'arraybuffer';

            xmlHTTP.onload = function(e) {
                var blob = new Blob([this.response]);
                thisImg.src = window.URL.createObjectURL(blob);
            };
            xmlHTTP.onprogress = function(e) {
                thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
                loadProgress(thisImg.completedPercentage)
            };
            xmlHTTP.onloadstart = function() {
                thisImg.completedPercentage = 0;
            };
            xmlHTTP.onloadend = function() {
                thisImg.completedPercentage = 100;
                if(imageRef.current) {
                    imageRef.current.src = thisImg.src
                }

                setTimeout(() => {
                    hasLoaded();
                }, 100)
            };
            xmlHTTP.send();
        };
    
        Image.prototype.completedPercentage = 0;

        img = new Image();
        img.load(`${window.location.origin}/map/TK_MAP_opti.jpg`)

      }, []);
    

    return (
        <img ref={imageRef} />
    )
}

export default Component