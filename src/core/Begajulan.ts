import express from "express";
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList
} = require('graphql');

class Begajulan {

  private _app: express.Application;
  private _schema: object = {};
  private _rootQueryType: object = {};
  private _value: object = {};

  public constructor() {
      this._app = express();
  }

  protected fieldsModel(_model: object[]): object {
    const _fd: object = {};
      for(let i = 0; i < _model.length; i++){
        for (var key in _model[i]) {
          Object.defineProperty(_fd, key.toString(), {
            value: {},
            writable: true
          })
        }
      }
      return _fd;
  }

  protected rootQuery(_rn: string, _dsc: string, _fld: object[], _dt: object): object {
     this._value = _dt;
     return this._rootQueryType = new GraphQLObjectType({
        name: _rn,
        description: _dsc,
        fields: () => (this.fieldsModel(_fld)),
        resolve: () => _dt
     });
  }

  protected findQuery(): object {
    return {}
  }

  protected createSchema(_rqt: object): object {
    //   this._rootQueryTpe = _rqt;
      return this._schema = new GraphQLSchema({
          query: this._rootQueryType
      });
  }

  protected createRouting(_urlname: string) : object {
      return this._app.use(`/${_urlname}`, graphqlHTTP({
        schema: this._schema,
        graphiql: true
      }));
  }
}

export default new Begajulan();