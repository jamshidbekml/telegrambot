const axios = require('axios').default;

const InstagramVideo = async (ctx, story) => {
    try {
        ctx.reply('⏳');
        const { data } = await axios.post(
            'https://storiesig.info/api/convert',
            {
                url: ctx.message.text,
            },
            {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                },
            }
        );
        var type;
        var url;
        if (data[0]) {
            data.forEach((e) => {
                type = e.url[0].type == 'mp4' ? 'video' : 'photo';
                url = e.url[0].url;
                ctx.replyWithChatAction(`upload_${type}`);
                ctx.telegram.sendMediaGroup(ctx.message.chat.id, [
                    {
                        type: type,
                        media: url,
                    },
                ]);
            });
        } else {
            type = data.url[0].type == 'mp4' ? 'video' : 'photo';
            url = data.url[0].url;
            ctx.replyWithChatAction(`upload_${type}`);
            ctx.telegram.sendMediaGroup(ctx.message.chat.id, [
                {
                    type: type,
                    media: url,
                },
            ]);
        }
        // ctx.replyWithVideo(
        //     {
        //         url: link,
        //     },
        //     {
        //         caption: `@smvideosdl_bot`,
        //     }
        // );
        // if (
        //     JSON.parse(data).videos_links.length == 0 &&
        //     JSON.parse(data).images_links.length == 0
        // ) {
        //     const newLinkArr = ctx.message.text.split('/');
        //     const newLink = `https://www.instagram.com/${newLinkArr[3]}/${newLinkArr[4]}`;
        //     const { data } = await axios.get(
        //         'https://instadownloader.co/insta_downloader.php?url=' +
        //             newLink,
        //         {
        //             headers: {
        //                 'User-Agent':
        //                     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        //             },
        //         }
        //     );
        //     if (JSON.parse(data).images_links && story) {
        //         const ImagesLinks = JSON.parse(data).images_links;
        //         ImagesLinks.forEach((e) => {
        //             ctx.replyWithChatAction('upload_photo');
        //             ctx.replyWithPhoto(
        //                 {
        //                     url: e.url,
        //                 },
        //                 {
        //                     caption: `@smvideosdl_bot`,
        //                 }
        //             );
        //         });
        //     }
        //     if (JSON.parse(data).videos_links) {
        //         const VideoLinks = JSON.parse(data).videos_links;
        //         VideoLinks.forEach(async (e) => {
        //             ctx.replyWithChatAction('upload_video');
        //             ctx.replyWithVideo(
        //                 {
        //                     url: e.url,
        //                 },
        //                 {
        //                     caption: `@smvideosdl_bot`,
        //                 }
        //             );
        //         });
        //     }
        //     return;
        // }
        // if (JSON.parse(data).images_links && story) {
        //     const ImagesLinks = JSON.parse(data).images_links;
        //     ImagesLinks.forEach((e) => {
        //         ctx.replyWithChatAction('upload_photo');
        //         ctx.replyWithPhoto(
        //             {
        //                 url: e.url,
        //             },
        //             {
        //                 caption: `@smvideosdl_bot`,
        //             }
        //         );
        //     });
        // }
        // if (JSON.parse(data).videos_links) {
        //     const VideoLinks = JSON.parse(data).videos_links;
        //     VideoLinks.forEach(async (e) => {
        //         ctx.replyWithChatAction('upload_video');
        //         ctx.replyWithVideo(
        //             {
        //                 url: e.url,
        //             },
        //             {
        //                 caption: `@smvideosdl_bot`,
        //             }
        //         );
        //     });
        // }
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
module.exports = { InstagramVideo };
