import { YuKumo } from "yukumo";

async function test() {
  const kumo = new YuKumo({
    userId: "1381153133568331777",
    nodes: [
      {
        name: "test",
        host: "de1.aspirehosting.in",
        port: 3008,
        password: "flixo",
        secure: false,
      }
    ],
  });

  kumo.on("nodeReady", async (nodeId) => {
    console.log("Node ready:", nodeId);
    const result = await kumo.search("ytsearch:Never gonna give you up");
    const track = result.tracks[0];
    console.log("Found track encoded length:", track.encoded.length);
    
    try {
      const node = kumo.nodes.get("test");
      console.log("Testing updatePlayer with { track: null }...");
      await node.rest.updatePlayer(
        node.rest.sessionId,
        "123456789",
        {
          track: null as any,
        },
        false
      );
      console.log("Update player { track: null } SUCCESS!");
    } catch (e: any) {
      console.error("Failed with { track: null }:", e.message, e.statusCode);
    }

    try {
      const node = kumo.nodes.get("test");
      console.log("Testing updatePlayer with { track: { encoded: null } }...");
      await node.rest.updatePlayer(
        node.rest.sessionId,
        "123456789",
        {
          track: { encoded: null },
        },
        false
      );
      console.log("Update player { track: { encoded: null } } SUCCESS!");
    } catch (e: any) {
      console.error("Failed with { track: { encoded: null } }:", e.message, e.statusCode);
    }
    
    process.exit(0);
  });

  kumo.on("nodeError", (node, error) => console.error("Node error:", error));
  
  await kumo.init();
}

test();
