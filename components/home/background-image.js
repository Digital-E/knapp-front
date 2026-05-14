import { useEffect, useRef } from "react";

let cachedBlobUrl = null;

export const isCached = () => !!cachedBlobUrl;

const Component = ({ hasLoaded, loadProgress }) => {
    let imageRef = useRef();
    let img = null;

    useEffect(() => {
        if (cachedBlobUrl) {
            if (imageRef.current) imageRef.current.src = cachedBlobUrl;
            hasLoaded();
            return;
        }

        Image.prototype.load = function(url){
            var thisImg = this;
            var xmlHTTP = new XMLHttpRequest();
            xmlHTTP.open('GET', url, true);
            xmlHTTP.responseType = 'blob';

            xmlHTTP.onload = function() {
                thisImg.src = window.URL.createObjectURL(this.response);
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
                cachedBlobUrl = thisImg.src;
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
        img.load(`${window.location.origin}/map/TK_MAP_opti2.jpg`)

      }, []);


    return (
        <img ref={imageRef} />
    )
}

export default Component
