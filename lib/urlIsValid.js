const { default: axios } = require('axios');

const UrlIsValid = async (url) => {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            },
        });
        return true;
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = { UrlIsValid };
