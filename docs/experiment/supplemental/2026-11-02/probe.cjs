const fs=require('node:fs');const path=require('node:path');const {spawn}=require('node:child_process');
const {chromium}=require('/Users/richardlau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=__dirname;const privateDir=path.resolve(root,'../../private/supplemental-2026-11-02');process.env.TMPDIR=privateDir;
const servers=[];let browser;
(async()=>{
 const record={startedAt:new Date().toISOString(),authorization:'Owner explicitly approved standalone Playwright, fresh isolated contexts and evidence-only harness files.',playwright:require('/Users/richardlau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json').version,node:process.version,executable:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',contextOptions:{viewport:{width:1280,height:800},deviceScaleFactor:1,locale:'en-US',timezoneId:'America/Los_Angeles',colorScheme:'light'},conditions:[]};
 try{
 for(const [condition,port] of [['control',3101],['treatment',3102]]){
  const cwd=`/Users/richardlau/Development/Celestia-experiment-${condition}`;
  const out=fs.openSync(path.join(root,`${condition}-probe-server.txt`),'w');
  const server=spawn('npm',['start','--','--hostname','127.0.0.1','--port',String(port)],{cwd,stdio:['ignore',out,out],detached:true});servers.push(server);
  for(let i=0;i<50;i++){try{if((await fetch(`http://127.0.0.1:${port}`)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 }
 browser=await chromium.launch({headless:true,executablePath:record.executable});record.browserVersion=browser.version();
 const contexts=[];
 for(const [condition,port] of [['control',3101],['treatment',3102]]){
  const context=await browser.newContext(record.contextOptions);contexts.push(context);const page=await context.newPage();
  const url=`http://127.0.0.1:${port}/`;await page.goto(url);const inputs=page.getByRole('textbox');await inputs.first().waitFor();await page.getByRole('button',{name:'Check inputs',exact:true}).waitFor();
  await inputs.first().fill('2000-01-15');const entered=await inputs.first().inputValue();
  await page.getByRole('button',{name:'Check inputs',exact:true}).click();
  await page.getByRole('alert').filter({hasText:/Enter/}).waitFor();
  const ax=await page.locator('main').ariaSnapshot();await page.reload();await inputs.first().waitFor();
  const emptyAfterReload=await inputs.first().inputValue();
  const item={condition,port,url,entered,emptyAfterReload,contextDistinct:contexts.length===1||contexts[0]!==context,ax,metadata:await page.evaluate(()=>({userAgent:navigator.userAgent,language:navigator.language,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,innerWidth,innerHeight,devicePixelRatio,visualViewportScale:visualViewport.scale})),cookies:await context.cookies()};
  record.conditions.push(item);if(entered!=='2000-01-15'||emptyAfterReload!=='')throw Error('Basic interaction/reload probe failed');
 }
 record.passed=true;
 }catch(e){record.passed=false;record.error=String(e.stack||e);throw e;}
 finally{if(browser)await browser.close();for(const s of servers){try{process.kill(-s.pid,'SIGTERM')}catch{}}record.endedAt=new Date().toISOString();fs.writeFileSync(path.join(root,'browser-probe.json'),JSON.stringify(record,null,2)+'\n');console.log(JSON.stringify(record,null,2));}
})().catch(()=>process.exitCode=1);
