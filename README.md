pass.in
O pass.in é uma aplicação de gestão de participantes em eventos presenciais.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

Requisitos
Requisitos funcionais
- [] organizador deve poder cadastrar um novo evento;
- [] organizador deve poder visualizar dados de um evento;
- [] organizador deve poser visualizar a lista de participantes;
- [] participante deve poder se inscrever em um evento;
- [] participante deve poder visualizar seu crachá de inscrição;
- [] participante deve poder realizar check-in no evento;
Regras de negócio
- [] participante só pode se inscrever em um evento uma única vez;
- [] participante só pode se inscrever em eventos com vagas disponíveis;
- [] participante só pode realizar check-in em um evento uma única vez;
Requisitos não-funcionais
- [] check-in no evento será realizado através de um QRCode;