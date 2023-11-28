
const hook = process.env.DiscordHookURL


export default function new_Pr(pullid: string, user: string) {


const hexColor = '#32CD32';

const decimalColor = parseInt(hexColor.replace('#', ''), 16);

const message = {
    embeds: [{
        title: "New Pull Request",
        description: "A new pull request has been created!",
        color: decimalColor,
        fields: [
            {
                name: "Pull Request ID",
                value: pullid, // replace with actual PR ID
            },
            {
                name: "Created By",
                value: user, // replace with actual user
            },
            // more fields as needed
        ],
    }],
};


if (!hook) {
    throw new Error('DiscordHookURL is not set in the environment variables');
}


fetch(hook, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
    console.error('Error:', error);
});
}