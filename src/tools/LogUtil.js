class LogUtil {

    static log() {
        if (this.isDev()) {
            // let args = Array.prototype.slice.call(arguments);
            console.log.apply(console, arguments);
        }
    }

    static err() {
        if (this.isDev()) {
            console.error.apply(console, arguments);
        }
    }

    static isDev() {
        return process.env.NODE_ENV === 'development';
    }

}

export default LogUtil;