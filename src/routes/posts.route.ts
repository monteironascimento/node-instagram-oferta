import { Router } from 'express';
import Instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';

const efetuarPostagem = Router();

efetuarPostagem.post("/", async (req, res) => {

    console.log(req)

    const { username, tags, description, dirImagem, token, tpPostagem, dirAbsoluto , nameImagem} = req.body;
    console.log(req.body)
    let password = 'Monteiro01*'
    let dir = `./imagens/Temp/${nameImagem}`
    try{

        if(token != "KAHDHA(S(&#&@)#(9234"){
            return res.status(404).json({ error: "Token Invalid"});
        }

        const cookieStore = new FileCookieStore(`./cookies/cookies${username}.json`)
        const client = new Instagram({ username, password, cookieStore })

        await client
            .login()
            .then(() => {
            client
                .getProfile()
                .then(console.log)
            })

        let caption  = `${description}    ${tags}`
        
        console.log(`Efetuar a postagem ${username} - ${dir}   TIPO POSTAGEM${tpPostagem}`)

        if(tpPostagem === 'feed'){
            try{
                const mediaFeed = await client.uploadPhoto({ photo: dir, caption: caption, post: 'feed' });
                console.log(`Feed ${username}: https://www.instagram.com/p/${mediaFeed.media.code}/     ${new Date()}`);
            } catch(error){
                console.log(`Erro: ${error}`);
            }
        }else if (tpPostagem === 'story') {
            try{
                const mediaStory = await client.uploadPhoto({ photo: dir, caption: caption, post: 'story' });
                console.log(`Story ${username}: https://www.instagram.com/p/${mediaStory.media.code}/      ${new Date()}`);
            } catch(error){
                console.log(`Erro: ${error}`);
            }
    
        }else{
            console.log('Postagem não especificada')
        }
       
    } catch(error){
        console.log(`Erro: ${error}`);
    }

    console.log(`PROCESSO FINALIZADO!`);
      
    return res.status(201).json({ status: "OK"});
})


export { efetuarPostagem};