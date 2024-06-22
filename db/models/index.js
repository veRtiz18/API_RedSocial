const { Notificacion, NotificacionSchema } = require('./notificacion.model');
const { Accion, AccionSchema } = require('./accion.model')
const { EstadoNotificacion, Estado_Notificacion_Schema } = require('./estado_notificacion.model');
const { Usuario, UsuarioSchema } = require('./usuario.model');
const { Reaccion, ReaccionSchema } = require('./reaccion.model');
const { TipoPrivacidad, Tipo_Privacidad_Schema } = require('./tipo_privacidad.model');
const { Publicacion, PublicacionSchema } = require('./publicacion.model');
const { Amigo, AmigoSchema } = require('./amigo.model');
const { Comentario, ComentarioSchema } = require('./comentario.model');
const { Compartir, CompartirSchema } = require('./compartir.model');


function setupModels(sequelize) {
  Notificacion.init(NotificacionSchema, Notificacion.config(sequelize));
  Accion.init(AccionSchema, Accion.config(sequelize));
  EstadoNotificacion.init(Estado_Notificacion_Schema, EstadoNotificacion.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Reaccion.init(ReaccionSchema, Reaccion.config(sequelize));
  TipoPrivacidad.init(Tipo_Privacidad_Schema, TipoPrivacidad.config(sequelize));
  Publicacion.init(PublicacionSchema, Publicacion.config(sequelize));
  Amigo.init(AmigoSchema, Amigo.config(sequelize));
  Comentario.init(ComentarioSchema, Comentario.config(sequelize));
  Compartir.init(CompartirSchema, Compartir.config(sequelize));


  Accion.associate(sequelize.models);
  Notificacion.associate(sequelize.models);
  EstadoNotificacion.associate(sequelize.models);
  Usuario.associate(sequelize.models);
  Reaccion.associate(sequelize.models);
  TipoPrivacidad.associate(sequelize.models);
  Publicacion.associate(sequelize.models);
  Amigo.associate(sequelize.models);
  Comentario.associate(sequelize.models);
  Compartir.associate(sequelize.models);

}
module.exports = setupModels;
