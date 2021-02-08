/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de création :  08/02/2021 08:33:20                      */
/*==============================================================*/


drop table if exists T_TEMPERATURE;

drop table if exists T_UTILISATEUR;

/*==============================================================*/
/* Table : T_TEMPERATURE                                        */
/*==============================================================*/
create table T_TEMPERATURE
(
   ID_RELEVE            int not null,
   ID_USER              int not null,
   DEGRES               decimal(10,1),
   HUMIDITE             int,
   DATEADD              date,
   HOURADD              time,
   primary key (ID_RELEVE)
);

/*==============================================================*/
/* Table : T_UTILISATEUR                                        */
/*==============================================================*/
create table T_UTILISATEUR
(
   ID_USER              int not null auto_increment,
   NOM                  varchar(40),
   PRENOM               varchar(40),
   VILLE                varchar(40),
   API_KEY              varchar(63) not null,
   IPUSER               varchar(16),
   DATEADD              date,
   EMAIL                varchar(100),
   PASSWRD              varchar(100),
   primary key (ID_USER)
);

alter table T_TEMPERATURE add constraint FK_AFFECTER foreign key (ID_USER)
      references T_UTILISATEUR (ID_USER) on delete restrict on update restrict;

