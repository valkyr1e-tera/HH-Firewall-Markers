const Vec3 = require('tera-vec3')

module.exports = function HHMarkers(mod) {
  const COORDS = [
    { x: -7364, y: -83180, z: 1 }, // Front (head)
    { x: -8946, y: -84887, z: 1 }, // Right-Back leg
    { x: -8686, y: -85301, z: 1 }, // Right-Back leg 2
    { x: -8620, y: -83531, z: 1 }, // Right-Front leg
    { x: -6667, y: -85440, z: 1 }, // Left-Back leg
    { x: -7403, y: -85814, z: 1 }, // Left-Back leg 2
    { x: -6411, y: -84057, z: 1 }, // Left-Front leg
    { x: -6353, y: -84872, z: 1 }, // Left-Middle
    { x: -8908, y: -84001, z: 1 }  // Right-Middle
  ]
  let markers = []
  let uid = 999999999

  mod.hook('S_LOAD_TOPO', 3, () => {
    for (const marker of markers)
      mod.send('S_DESPAWN_BUILD_OBJECT', 2, { gameId: marker })
    markers = []
  })
  
  mod.hook('C_LOAD_TOPO_FIN', 1, () => {
    if (mod.game.me.zone === 9950) {
      for (const coord of COORDS) {
        mod.send('S_SPAWN_BUILD_OBJECT', 2, {
          gameId: uid,
          itemId: 1,
          loc: new Vec3(coord),
          w: Math.random() * Math.PI * 2,
          ownerName: mod.game.me.name,
          message: ''
        })
        markers.push(uid)
        uid--
      }
    }
  })
}