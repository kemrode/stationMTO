/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 8                                  */
/* Date de création :  07/02/2021 15:07:02                      */
/*==============================================================*/


drop index T_TEMPERATURE_PK;

drop table T_TEMPERATURE;

drop index AFFECTER_FK;

drop index T_UTILISATEUR_PK;

drop table T_UTILISATEUR;

/*==============================================================*/
/* Table : T_TEMPERATURE                                        */
/*==============================================================*/
create table T_TEMPERATURE (
   ID_MACHINE           SERIAL               not null,
   DEGRES               INT4                 null,
   HUMIDITE             NUMERIC              null,
   constraint PK_T_TEMPERATURE primary key (ID_MACHINE)
);

/*==============================================================*/
/* Index : T_TEMPERATURE_PK                                     */
/*==============================================================*/
create unique index T_TEMPERATURE_PK on T_TEMPERATURE (
ID_MACHINE
);

/*==============================================================*/
/* Table : T_UTILISATEUR                                        */
/*==============================================================*/
create table T_UTILISATEUR (
   ID_USER              SERIAL               not null,
   ID_MACHINE           INT4                 not null,
   NOM                  VARCHAR(40)          null,
   PRENOM               VARCHAR(40)          null,
   VILLE                VARCHAR(40)          null,
   API_KEY              VARCHAR(63)          not null,
   DATEADD              DATE                 null,
   IP_USER              VARCHAR(16)          null,
   constraint PK_T_UTILISATEUR primary key (ID_USER)
);

/*==============================================================*/
/* Index : T_UTILISATEUR_PK                                     */
/*==============================================================*/
create unique index T_UTILISATEUR_PK on T_UTILISATEUR (
ID_USER
);

/*==============================================================*/
/* Index : AFFECTER_FK                                          */
/*==============================================================*/
create  index AFFECTER_FK on T_UTILISATEUR (
ID_MACHINE
);

alter table T_UTILISATEUR
   add constraint FK_T_UTILIS_AFFECTER_T_TEMPER foreign key (ID_MACHINE)
      references T_TEMPERATURE (ID_MACHINE)
      on delete restrict on update restrict;

