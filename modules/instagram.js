const { UrlIsValid } = require('../lib/urlIsValid');
const axios = require('axios').default;

const Instagram = async (ctx, story) => {
    try {
        ctx.reply('⏳');
        const { data } = await axios.get(
            'https://instadownloader.co/insta_downloader.php?url=' +
                ctx.message.text,
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                },
            }
        );
        if (
            JSON.parse(data).videos_links.length == 0 &&
            JSON.parse(data).images_links.length == 0
        ) {
            const newLinkArr = ctx.message.text.split('/');
            const newLink = `https://www.instagram.com/${newLinkArr[3]}/${newLinkArr[4]}`;
            const { data } = await axios.get(
                'https://instadownloader.co/insta_downloader.php?url=' +
                    newLink,
                {
                    headers: {
                        'User-Agent':
                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                    },
                }
            );
            if (JSON.parse(data).images_links && story) {
                const ImagesLinks = JSON.parse(data).images_links;
                ImagesLinks.forEach((e) => {
                    ctx.replyWithChatAction('upload_photo');
                    ctx.replyWithPhoto(
                        {
                            url: e.url,
                        },
                        {
                            caption: `@smvideosdl_bot`,
                        }
                    );
                });
            }
            if (JSON.parse(data).videos_links) {
                const VideoLinks = JSON.parse(data).videos_links;
                VideoLinks.forEach(async (e) => {
                    if (await UrlIsValid(e.url)) {
                        ctx.replyWithChatAction('upload_video');
                        ctx.replyWithVideo(
                            {
                                url: e.url,
                            },
                            {
                                caption: `@smvideosdl_bot`,
                            }
                        );
                    } else {
                        ctx.reply('URL signature expired !!!', {
                            reply_to_message_id: ctx.message.message_id,
                        });
                    }
                });
            }
            return;
        }
        if (JSON.parse(data).images_links && story) {
            const ImagesLinks = JSON.parse(data).images_links;
            ImagesLinks.forEach((e) => {
                ctx.replyWithChatAction('upload_photo');
                ctx.replyWithPhoto(
                    {
                        url: e.url,
                    },
                    {
                        caption: `@smvideosdl_bot`,
                    }
                );
            });
        }
        if (JSON.parse(data).videos_links) {
            const VideoLinks = JSON.parse(data).videos_links;
            VideoLinks.forEach(async (e) => {
                if (await UrlIsValid(e.url)) {
                    ctx.replyWithChatAction('upload_video');
                    ctx.replyWithVideo(
                        {
                            url: e.url,
                        },
                        {
                            caption: `@smvideosdl_bot`,
                        }
                    );
                } else {
                    ctx.reply('URL signature expired !!!', {
                        reply_to_message_id: ctx.message.message_id,
                    });
                }
            });
        }
    } catch (err) {
        ctx.reply(
            'This link is incorrectly entered or the user account is private',
            {
                reply_to_message_id: ctx.message.message_id,
            }
        );
        console.log(err.message);
    }
};
module.exports = { Instagram };
