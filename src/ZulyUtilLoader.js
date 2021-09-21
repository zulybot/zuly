// Sistema de música
require('./Client/plugins/lavalinkManager');
// Handler de comandos/eventos
require('./Client/handler/comandos');
require('./Client/handler/eventos');
// Puxando a database
require('./Database/MongoDB');
// Funções customizadas
require('./ZulyFunctions');
// Sistema de Giveaways
require('./giveaways');
