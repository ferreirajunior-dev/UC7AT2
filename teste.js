const {Builder, By, Key, until} = require('selenium-webdriver');

async function iniciarTestes(){
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Iniciando testes automatizados ...");
        await driver.get('https://online.sp.senai.br/');
        await driver.manage().window().maximize();
        try {
            let botaoCookie = await driver.wait(until.elementLocated(By.css('.dp-bar-button, #btn-aceite-cookies')), 5000);
            await botaoCookie.click();
            console.log("--> Sucesso: Banner de cookies fechado.");
            await driver.sleep(1000);
        } catch (erro) {
            console.log("--> Aviso: O banner de coockies não apareceu. Segue o jogo.");
        }
        console.log("\\n=== Iniciando Teste 02: Fale Conosco===");
        let faleConosco = await driver.wait(until.elementLocated(By.linkText('Fale Conosco')), 5000);
        faleConosco.click();
        await driver.sleep(2000);
        console.log("--> Sucesso: Página de Unidades acessada.");
        await driver.navigate().back();
        console.log("\n=== Iniciando Teste 03: Busca de Cursos e Cursos Gratuitos===");
        let campoBusca = await driver.wait(until.elementLocated(By.id('pesquisa')), 5000);
        await driver.executeScript("arguments[0].scrollIntoView(true);", campoBusca);
        await campoBusca.sendKeys('Excel', Key.RETURN);
        await driver.wait(until.urlContains('pesquisa'), 5000);
        console.log("--> Sucesso: Pesquisa realizada e página de resultados de busca carregada.");
        let filtroGratuidade= await driver.wait(until.elementLocated(By.id('filtroGratuito')), 5000);
        await filtroGratuidade.click();
        console.log(" --> Sucesso o click funcionou.")
        await driver.get('https://online.sp.senai.br/');
        let urlAtual = await driver.getCurrentUrl();
        if(urlAtual.includes('online.sp.senai.br')){
            console.log("--> Atenção: Continuamos no portal Online.");
        } else {
            console.log("--> Sucesso: Redirecionado para a Home do SENAI SP.");
        }
    } catch (erro) {
        console.error("!!! OCORREU UM ERRO NO TESTE !!!")
        console.error("Motivo do erro: ", erro);
    } finally {
        console.log("\nTestes concoluidos. Finalizando o navegador.");
        await driver.sleep(3000);
        await driver.quit();
    }
}
iniciarTestes();