interface ParsedContainer {
  name: string;
  image: string;
  ports: { host: number; container: number }[];
  status: string;
  created: string;
  networkId?: string;
}

interface ParsedNetwork {
  id: string;
  name: string;
  created: string;
}

export function parseDockerNetworkCommand(command: string): ParsedNetwork | null {
  try {
    const parts = command.trim().split(/\s+/);
    console.log('Network command parts:', parts);
    
    // docker network create [name]
    if (parts.length >= 4 && 
        parts[0] === 'docker' && 
        parts[1] === 'network' && 
        parts[2] === 'create') {
      const networkName = parts[3];
      console.log('Creating network with name:', networkName);
      
      return {
        id: `network-${Date.now()}`,
        name: networkName,
        created: new Date().toISOString()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing network command:', error);
    return null;
  }
}

export function parseDockerRunCommand(command: string, activeNetworkId?: string): ParsedContainer | null {
  try {
    const parts = command.trim().split(/\s+/);
    console.log('Run command parts:', parts);

    if (parts[0] !== 'docker' || parts[1] !== 'run') {
      return null;
    }

    let name = '';
    let image = '';
    let networkId = activeNetworkId;
    const ports: { host: number; container: number }[] = [];

    for (let i = 2; i < parts.length; i++) {
      const part = parts[i];
      console.log('Processing part:', part);

      if (part === '--name' && i + 1 < parts.length) {
        name = parts[++i];
        console.log('Found name:', name);
      } else if (part === '-p' || part === '--publish') {
        if (i + 1 < parts.length) {
          const portMapping = parts[++i];
          const [host, container] = portMapping.split(':').map(Number);
          if (!isNaN(host) && !isNaN(container)) {
            ports.push({ host, container });
            console.log('Added port mapping:', { host, container });
          }
        }
      } else if ((part === '--network' || part === '--net') && i + 1 < parts.length) {
        networkId = parts[++i];
        console.log('Found network:', networkId);
      } else if (!part.startsWith('-') && !image) {
        image = part;
        console.log('Found image:', image);
      }
    }

    if (!name || !image) {
      console.log('Missing required fields:', { name, image });
      return null;
    }

    const container = {
      name,
      image,
      ports,
      status: 'running',
      created: new Date().toISOString(),
      networkId
    };

    console.log('Created container object:', container);
    return container;
  } catch (error) {
    console.error('Error parsing run command:', error);
    return null;
  }
} 