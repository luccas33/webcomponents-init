
const keys = {
    navToPage: 'navToPage'
}

let funcId = 0;

const eventGroups: {name: string, events: {id: number, func: Function}[]}[] = []

/**
 * Adiciona uma function associada com o name para ser executada em exec()
 */
function add(name: string, func: Function) {
    if (!name || !func || !(func instanceof Function)) {
        return 0;
    }
    let group = eventGroups.find(g => g.name == name);
    if (!group) {
        group = {name, events: []};
        eventGroups.push(group);
    }
    let id = ++funcId;
    group.events.push({id, func});
    return id;
}

/**
 * Executa as functions adicionadas com o name
*/
function exec(name: string, evtData?: any) {
    if (!name) {
        return;
    }
    let group = eventGroups.find(g => g.name == name);
    if (!group) {
        return;
    }
    group.events.forEach(evt => {
        try {
            evt.func(evtData);
        } catch(e) {
            console.log(`Error on ${name} event: `, e);
        }
    });
}

/**
 * Remove uma function relacionada ao name e id 
 */
function remove(name: string, id: number) {
    let group = eventGroups.find(g => g.name == name);
    if (!group) {
        return;
    }
    group.events = group.events.filter(evt => evt.id != id);
}

/**
 * Eventos executados entre componentes
*/
export const appEvents = {keys, add, exec, remove};
