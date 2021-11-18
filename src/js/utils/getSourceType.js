/**
 * getSourceType
 * @param {string} extension video extestion will be converted to a source type
 * @return {string} value of type attr of source tag
 */
export default function getSourceType(extension) {
    switch(extension) {
        case "mp4":
            return "video/mp4";
        case "webm":
            return "video/webm";
        case "mov":
            return "video/quicktime";
        case "ogm":
        case "ogv":
        case "ogg":
            return "video/ogg";
    }
}
