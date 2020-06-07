const users = [{
	id: 'as23',
	nick: 'Octopus',
	firstName: 'John',
	LastName: 'Dou'
}, {
	id: 'as25',
	nick: 'Star',
	firstName: 'Andy',
	LastName: 'Lee'
}, {
	id: 'as77',
	nick: 'Wally',
	firstName: 'Liza',
    LastName: 'Corty'}];
    
const usersObj = users.reduce((obj, current) => {
                    obj[current.id] = {...current};
                    delete obj[current.id].id;
                    return obj;
                }, {});
console.log('Original Array', users);
console.log('Converted in Object', usersObj);
