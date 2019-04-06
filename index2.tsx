import {
  StringNode,
  NumberNode,
  ObjectNode,
  FieldNode,
  InputNode,
  InputNodeField,
  Arguments,
  ArgumentsField,
  ArrayNode,
  UnionNode,
  InterfaceNode,
  NodeDataType,
  DataProxy,
  SelectionRoot,
  ASTBuilder,
  Query,
  LoggerMiddleware,
} from './src/new'
import { Schema, SchemaType, Type, SchemaFieldArgs } from './src'
import { Codegen } from './src/new/Codegen'
import { types_github } from './typesGithub'

export const test = (nodes, fetchQuery) => {
  const root = new SelectionRoot(nodes.Query)
  const data = nodes.Query.getData(root)

  const query = new Query(nodes.Query, fetchQuery, { name: 'TestQuery' })
  query.middleware.add(new LoggerMiddleware(query))

  // @ts-ignore
  Object.assign(window, {
    root,
    types: nodes,
    astBuilder: new ASTBuilder('TestQuery'),
    query,
    data,
  })

  // root.value = {
  //   user: { name: 'hello', avatarUrl: 'asd' },
  //   users: [{ name: 'arr', avatarUrl: 'asd' }],
  // }

  // data.a.b.c

  // data.getUser({ id: 10 }).name
  // data.user.age
  // data.user.name
  // data.users[0].name
  // data.users[0].age

  // const codegen = new Codegen(schema)

  // console.log(codegen.generate())

  // console.log(resolvedTypes)

  // console.log(Query)
  // console.log(schema)
}

// const types = {
//   get Query() {
//     return new ObjectNode(
//       {
//         get user() {
//           return new FieldNode(types.User, null, true)
//         },
//         get users() {
//           return new FieldNode(new ArrayNode(types.User, false), null, false)
//         },
//         get users2() {
//           return new FieldNode(
//             new ArrayNode(new ArrayNode(types.User, true), true),
//             null,
//             true
//           )
//         },
//         get a() {
//           return new FieldNode(types.A, null, true)
//         },
//         get number() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get getUser() {
//           return new FieldNode(
//             types.User,
//             new Arguments({
//               get id() {
//                 return new ArgumentsField(types.ID, true)
//               },
//             }),
//             true
//           )
//         },
//         get getUsers() {
//           return new FieldNode(
//             new ArrayNode(types.User, false),
//             new Arguments({
//               get id() {
//                 return new ArgumentsField(types.ID, true)
//               },
//             }),
//             false
//           )
//         },
//         get testOrUser() {
//           return new FieldNode(types.TestOrUser, null, true)
//         },
//         get test() {
//           return new FieldNode(types.Test, null, true)
//         },
//         get testWithInput() {
//           return new FieldNode(
//             types.Int,
//             new Arguments({
//               get id() {
//                 return new ArgumentsField(types.String, true)
//               },
//               get ids() {
//                 return new ArgumentsField(
//                   new ArrayNode(types.String, false),
//                   false
//                 )
//               },
//               get input() {
//                 return new ArgumentsField(types.InputObj, true)
//               },
//             }),
//             true
//           )
//         },
//       },
//       { name: 'Query' }
//     )
//   },
//   get User() {
//     return new ObjectNode(
//       {
//         get id() {
//           return new FieldNode(types.ID, null, false)
//         },
//         get name() {
//           return new FieldNode(types.String, null, true)
//         },
//         get age() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get b() {
//           return new FieldNode(types.String, null, true)
//         },
//         get c() {
//           return new FieldNode(types.String, null, true)
//         },
//         get d() {
//           return new FieldNode(types.String, null, true)
//         },
//       },
//       { name: 'User' }
//     )
//   },
//   get ID() {
//     return new StringNode({ name: 'ID' })
//   },
//   get String() {
//     return new StringNode({ name: 'String' })
//   },
//   get Int() {
//     return new NumberNode({ name: 'Int' })
//   },
//   get A() {
//     return new ObjectNode(
//       {
//         get b() {
//           return new FieldNode(types.B, null, true)
//         },
//       },
//       { name: 'A' }
//     )
//   },
//   get B() {
//     return new ObjectNode(
//       {
//         get c() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get d() {
//           return new FieldNode(types.Int, null, true)
//         },
//       },
//       { name: 'B' }
//     )
//   },
//   get TestOrUser() {
//     return new UnionNode([types.User, types.TestB])
//   },
//   get TestB() {
//     return new ObjectNode(
//       {
//         get a() {
//           return new FieldNode(types.String, null, true)
//         },
//         get b() {
//           return new FieldNode(types.String, null, true)
//         },
//       },
//       { name: 'TestB' }
//     )
//   },
//   get Test() {
//     return new InterfaceNode(
//       {
//         get a() {
//           return new FieldNode(types.String, null, true)
//         },
//       },
//       [types.TestB, types.TestC],
//       { name: 'Test' }
//     )
//   },
//   get InputObj() {
//     return new InputNode(
//       {
//         get a() {
//           return new FieldNode(types.String, null, false)
//         },
//       },
//       { name: 'InputObj' }
//     )
//   },
//   get Mutation() {
//     return new ObjectNode(
//       {
//         get deleteUser() {
//           return new FieldNode(
//             types.Int,
//             new Arguments({
//               get id() {
//                 return new ArgumentsField(types.ID, false)
//               },
//             }),
//             false
//           )
//         },
//       },
//       { name: 'Mutation' }
//     )
//   },
//   get __Schema() {
//     return new ObjectNode(
//       {
//         get types() {
//           return new FieldNode(new ArrayNode(types.__Type, false), null, false)
//         },
//         get queryType() {
//           return new FieldNode(types.__Type, null, false)
//         },
//         get mutationType() {
//           return new FieldNode(types.__Type, null, true)
//         },
//         get subscriptionType() {
//           return new FieldNode(types.__Type, null, true)
//         },
//         get directives() {
//           return new FieldNode(
//             new ArrayNode(types.__Directive, false),
//             null,
//             false
//           )
//         },
//       },
//       { name: '__Schema' }
//     )
//   },
//   get __Type() {
//     return new ObjectNode(
//       {
//         get kind() {
//           return new FieldNode(types.__TypeKind, null, false)
//         },
//         get name() {
//           return new FieldNode(types.String, null, true)
//         },
//         get description() {
//           return new FieldNode(types.String, null, true)
//         },
//         get fields() {
//           return new FieldNode(
//             new ArrayNode(types.__Field, true),
//             new Arguments({
//               get includeDeprecated() {
//                 return new ArgumentsField(types.Boolean, true)
//               },
//             }),
//             true
//           )
//         },
//         get interfaces() {
//           return new FieldNode(new ArrayNode(types.__Type, true), null, true)
//         },
//         get possibleTypes() {
//           return new FieldNode(new ArrayNode(types.__Type, true), null, true)
//         },
//         get enumValues() {
//           return new FieldNode(
//             new ArrayNode(types.__EnumValue, true),
//             new Arguments({
//               get includeDeprecated() {
//                 return new ArgumentsField(types.Boolean, true)
//               },
//             }),
//             true
//           )
//         },
//         get inputFields() {
//           return new FieldNode(
//             new ArrayNode(types.__InputValue, true),
//             null,
//             true
//           )
//         },
//         get ofType() {
//           return new FieldNode(types.__Type, null, true)
//         },
//       },
//       { name: '__Type' }
//     )
//   },
//   get __TypeKind() {
//     return undefined
//   },
//   get Boolean() {
//     return new BooleanNode({ name: 'Boolean' })
//   },
//   get __Field() {
//     return new ObjectNode(
//       {
//         get name() {
//           return new FieldNode(types.String, null, false)
//         },
//         get description() {
//           return new FieldNode(types.String, null, true)
//         },
//         get args() {
//           return new FieldNode(
//             new ArrayNode(types.__InputValue, false),
//             null,
//             false
//           )
//         },
//         get type() {
//           return new FieldNode(types.__Type, null, false)
//         },
//         get isDeprecated() {
//           return new FieldNode(types.Boolean, null, false)
//         },
//         get deprecationReason() {
//           return new FieldNode(types.String, null, true)
//         },
//       },
//       { name: '__Field' }
//     )
//   },
//   get __InputValue() {
//     return new ObjectNode(
//       {
//         get name() {
//           return new FieldNode(types.String, null, false)
//         },
//         get description() {
//           return new FieldNode(types.String, null, true)
//         },
//         get type() {
//           return new FieldNode(types.__Type, null, false)
//         },
//         get defaultValue() {
//           return new FieldNode(types.String, null, true)
//         },
//       },
//       { name: '__InputValue' }
//     )
//   },
//   get __EnumValue() {
//     return new ObjectNode(
//       {
//         get name() {
//           return new FieldNode(types.String, null, false)
//         },
//         get description() {
//           return new FieldNode(types.String, null, true)
//         },
//         get isDeprecated() {
//           return new FieldNode(types.Boolean, null, false)
//         },
//         get deprecationReason() {
//           return new FieldNode(types.String, null, true)
//         },
//       },
//       { name: '__EnumValue' }
//     )
//   },
//   get __Directive() {
//     return new ObjectNode(
//       {
//         get name() {
//           return new FieldNode(types.String, null, false)
//         },
//         get description() {
//           return new FieldNode(types.String, null, true)
//         },
//         get locations() {
//           return new FieldNode(
//             new ArrayNode(types.__DirectiveLocation, false),
//             null,
//             false
//           )
//         },
//         get args() {
//           return new FieldNode(
//             new ArrayNode(types.__InputValue, false),
//             null,
//             false
//           )
//         },
//         get onOperation() {
//           return new FieldNode(types.Boolean, null, false)
//         },
//         get onFragment() {
//           return new FieldNode(types.Boolean, null, false)
//         },
//         get onField() {
//           return new FieldNode(types.Boolean, null, false)
//         },
//       },
//       { name: '__Directive' }
//     )
//   },
//   get __DirectiveLocation() {
//     return undefined
//   },
//   get U() {
//     return new UnionNode([types.User])
//   },
//   get TestC() {
//     return new ObjectNode(
//       {
//         get a() {
//           return new FieldNode(types.String, null, true)
//         },
//         get c() {
//           return new FieldNode(types.String, null, true)
//         },
//       },
//       { name: 'TestC' }
//     )
//   },
//   get fake__Locale() {
//     return undefined
//   },
//   get fake__Types() {
//     return undefined
//   },
//   get fake__imageCategory() {
//     return undefined
//   },
//   get fake__loremSize() {
//     return undefined
//   },
//   get fake__color() {
//     return new InputNode(
//       {
//         get red255() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get green255() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get blue255() {
//           return new FieldNode(types.Int, null, true)
//         },
//       },
//       { name: 'fake__color' }
//     )
//   },
//   get fake__options() {
//     return new InputNode(
//       {
//         get useFullAddress() {
//           return new FieldNode(types.Boolean, null, true)
//         },
//         get minMoney() {
//           return new FieldNode(types.Float, null, true)
//         },
//         get maxMoney() {
//           return new FieldNode(types.Float, null, true)
//         },
//         get decimalPlaces() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get imageWidth() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get imageHeight() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get imageCategory() {
//           return new FieldNode(types.fake__imageCategory, null, true)
//         },
//         get randomizeImageUrl() {
//           return new FieldNode(types.Boolean, null, true)
//         },
//         get emailProvider() {
//           return new FieldNode(types.String, null, true)
//         },
//         get passwordLength() {
//           return new FieldNode(types.Int, null, true)
//         },
//         get loremSize() {
//           return new FieldNode(types.fake__loremSize, null, true)
//         },
//         get dateFormat() {
//           return new FieldNode(types.String, null, true)
//         },
//         get baseColor() {
//           return new FieldNode(types.fake__color, null, true)
//         },
//         get minNumber() {
//           return new FieldNode(types.Float, null, true)
//         },
//         get maxNumber() {
//           return new FieldNode(types.Float, null, true)
//         },
//         get precisionNumber() {
//           return new FieldNode(types.Float, null, true)
//         },
//       },
//       { name: 'fake__options' }
//     )
//   },
//   get Float() {
//     return new NumberNode({ name: 'Float' })
//   },
//   get examples__JSON() {
//     return new ScalarNode({ name: 'examples__JSON' })
//   },
// }

// async function a() {
//   const interfaceData = types.Query.data.test

//   if (interfaceData.__typename === 'TestB') {
//     interfaceData.a
//     interfaceData.b
//   } else {
//     interfaceData.a
//     interfaceData.c
//   }

//   const unionData = types.Query.data.testOrUser

//   if (unionData.__typename === 'User') {
//     unionData.name
//     unionData.age
//   } else {
//     unionData.a
//   }
// }

// @ts-ignore
if (window.asdasdasdsd) {
  const ghRoot = new SelectionRoot(types_github.Query)

  const data = ghRoot.createProxy()

  const repos = data
    .user({ login: 'samdenty99' })
    .repositories({ orderBy: { direction: {}, field: {} } })

  // @TODO: this is not typesafe for some reason
  // const n = repos.nodes[0]
  // n.createdAt
}

// @ts-ignore
if (window.__ASDASD_) {
  const String = new StringNode()
  const ID = new StringNode()
  const Int = new NumberNode()
  const Float = new NumberNode()

  const User = new ObjectNode(
    {
      name: new FieldNode(String),
      id: new FieldNode(ID),
      avatarURL: new FieldNode(
        String,
        new Arguments({
          size: new ArgumentsField(Int),
        })
      ),
      age: new FieldNode(Int),
    },
    { name: 'User' }
  )

  const Recursive = new ObjectNode({
    a: new FieldNode(String),
    get r() {
      return new FieldNode(Recursive)
    },
    // get rField() {
    //   return new FieldNode(RecursiveField)
    // },
  })

  Recursive.data.r.r.r.__typename

  const RecursiveField = new ObjectNode({
    get r() {
      return new FieldNode(Recursive)
    },
  })

  RecursiveField.data.r.r.r.a

  const Nameable = new InterfaceNode(
    {
      name: new FieldNode(String),
    },
    [User],
    { name: 'Nameable' }
  )
  var B: NodeDataType<typeof Nameable>

  const Person = new ObjectNode(
    {
      name: new FieldNode(String),
      firstName: new FieldNode(String),
      lastName: new FieldNode(String),
    },
    { name: 'Person' }
  )

  const Filter = new InputNode({
    count: new InputNodeField(Int),
    before: new InputNodeField(ID),
    after: new InputNodeField(ID),
    array: new InputNodeField(new ArrayNode(ID), true),
  })

  Filter.provide({
    after: '10',
    before: '10',
    count: 10,
    array: ['hello'],
  })

  // input.provide({
  //   id: 'hello',
  // })

  const TestArgs = new Arguments({
    filter: new ArgumentsField(Filter),
    filters: new ArgumentsField(new ArrayNode(Filter), true),
  })
  TestArgs.provide({ filter: { after: '', before: '', count: 10 } })
  // a.delete.

  const Query = new ObjectNode(
    {
      userOrPerson: new FieldNode(new UnionNode([User, Person])),
      user: new FieldNode(User),
      users: new FieldNode(new ArrayNode(User), TestArgs),
      users2: new FieldNode(new ArrayNode(new ArrayNode(User))),
      getUser: new FieldNode(
        User,
        new Arguments({ id: new ArgumentsField(String, false) })
      ),
    },
    { name: 'Query' }
  )
  ;(async () => {
    // let t: DataPromiseValue<typeof Query>
    // t.data
  })()

  let p: DataProxy<typeof Query>

  var t = p
    .users({ filter: { after: '', before: '', count: 10 } })[0]
    .avatarURL({ size: 100 })

  p.user.avatarURL({ size: 100 })
  p.getUser({ id: 'hello' }).avatarURL({ size: 100 })

  Query.data.__typename
  Query.data.getUser({ id: 'hello' }).avatarURL({ size: 100 })

  Query.data.__typename
  Query.data.user.name
  Query.data.users[0].name
  Query.data.users2[0][0].name
  Query.data.getUser({ id: 'asd' })

  const userOrPerson = Query.data.userOrPerson
  if (userOrPerson.__typename === 'User') {
    userOrPerson.name
    userOrPerson.age
  } else {
    userOrPerson.firstName
    userOrPerson.lastName
  }
}