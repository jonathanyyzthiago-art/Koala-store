# Autenticação da Koala Store

A loja usa Supabase Auth com o cliente JavaScript v2 carregado pelo CDN. A chave `sb_publishable_` presente no frontend é uma chave pública própria para aplicações de navegador; nunca coloque uma chave `service_role` ou segredo de provedor no código.

## URL de produção

- Site: https://koalastoregg.devs.surf
- Supabase Auth callback: https://zsgzvblcpekwkfiuidsc.supabase.co/auth/v1/callback
- URL de retorno do app: https://koalastoregg.devs.surf/

## Configurações necessárias no Supabase

Em **Authentication → URL Configuration**:
- Site URL: `https://koalastoregg.devs.surf`
- Redirect URLs: `https://koalastoregg.devs.surf/`

Em **Authentication → Providers**:
- Ativar Google e cadastrar o OAuth Client ID e Client Secret criados no Google Cloud.
- Ativar Discord e cadastrar o OAuth Client ID e Client Secret criados no Discord Developer Portal.
- O callback/redirect URI que deve ser cadastrado nos dois provedores é:
  `https://zsgzvblcpekwkfiuidsc.supabase.co/auth/v1/callback`

O código chama o OAuth do Supabase para Google e Discord. O acesso por email usa link mágico (OTP); o Supabase cria a conta quando necessário e envia o link para o email informado.

## Fluxo de sessão

- O SDK do Supabase persiste e renova a sessão.
- O estado autenticado é obtido de `supabase.auth.getSession()` e `onAuthStateChange`.
- O antigo indicador `koalaLogged` do localStorage é removido e não é mais aceito como autenticação.
- A intenção de adicionar produto ou abrir o checkout é guardada temporariamente em `sessionStorage` para continuar depois do retorno OAuth/email.
- O carrinho continua no localStorage, separado da autenticação.

## Observação sobre email

Para uso público, configure um provedor SMTP próprio em **Authentication → SMTP Settings** e revise os templates de email e limites de envio. O serviço de email padrão do Supabase pode ter restrições de envio.

## Segurança

Nunca exponha `service_role`, client secrets do Google/Discord, senhas SMTP ou outros segredos no frontend ou no repositório. Somente a URL do projeto e a publishable key devem estar no código do navegador.
