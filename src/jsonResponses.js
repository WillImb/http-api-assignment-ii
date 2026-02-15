const users = {};

const respondJSON = (request, response, status, object) => {

    const content = JSON.stringify(object);    
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content,'utf8')
    });

    if (request.method.toLowerCase() != "head") {
        response.write(content);
    }
    response.end();
}

const getUsers = (request, response) => {    

    const usersJSON = {
        users: JSON.stringify(users),
    }
    
    respondJSON(request, response, 200, usersJSON);
}

const addUser = (request, response) => {    

    const responseJSON = {
        message: 'Name and age are both required.'
    };

    const {name, age} = request.body;

    if(!name || !age ){
        responseJSON.id = 'missingParams';
        return respondJSON(request,response,400,responseJSON);
    }

    let responseCode = 204;

    if(!users[name]){
        responseCode= 201;
        users[name] = {
            name: name,
        };
    }

    users[name].age = age;

    if(responseCode == 201){
        responseJSON.message = 'Created Successfully';
        return respondJSON(request,response,responseCode,responseJSON);
    }

    return respondJSON(request, response, responseCode, responseJSON);
}

const notFound = (request,response) => {
    const responseJSON = {
        id: "notFound",
        message: 'The page you are looking for could not be found',        
    }

    respondJSON(request,response,404,responseJSON);
}

module.exports = {
    getUsers,
    notFound,
    addUser,
}