export default (slug, index) => {
    if(index === 0) {
        return slug.split("__")[0] !== undefined ? slug.split("__")[0] : "/"
    } else if (index === 1) {
        return slug.split("__")[1] !== undefined ? slug.split("__")[1] : "/"
    } else if (index === 2) {
        return slug.split("__")[2] !== undefined ? slug.split("__")[2] : "/"
    } else {
        return "/"
    }
}