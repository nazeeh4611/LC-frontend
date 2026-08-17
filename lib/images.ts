/**
 * Curated, licensed (Unsplash License — free for commercial use, no attribution
 * required) photography used across the marketing site. Centralized here so
 * the same image can be reused consistently and swapped in one place.
 */

function unsplash(id: string, w = 1600, q = 80) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const siteImages = {
  automotive: unsplash("photo-1679263201641-38e011daa0b8"), // engine bay detail
  globalTrade: unsplash("photo-1759272840712-c7e5ea852367"), // aerial container port
  energy: unsplash("photo-1692061157268-b128a8f37d6d"), // EV charging
  team: unsplash("photo-1758518731706-be5d5230e5a5"), // diverse business team
  warehouse: unsplash("photo-1645736315000-6f788915923b"), // forklift / warehouse
  sustainability: unsplash("photo-1592263904934-b00851dc93eb"), // solar panels

  // Additional hero / editorial imagery
  heroIndustrial: unsplash("photo-1581092160562-40aa08e78837"), // industrial factory floor
  automotiveWorkshop: unsplash("photo-1625047509168-a7026f36de04"), // mechanic workshop
  automotiveParts: unsplash("photo-1486262715619-67b85e0b08d3"), // engine parts close-up
  automotiveEngine: unsplash("photo-1596638787647-904d822d751e"), // engine block
  evCharging: unsplash("photo-1593941707882-a5bba14938c7"), // EV charging station
  batteryPack: unsplash("photo-1620714223084-8fcacc6dfd8d"), // battery pack
  batteryCells: unsplash("photo-1610647752706-3bb12232b3ab"), // lithium cells
  solarField: unsplash("photo-1508514177221-188b1cf16e9d"), // solar farm
  container: unsplash("photo-1494412574643-ff11b0a5c1c3"), // shipping containers
  containerPort: unsplash("photo-1577416412292-747c6607f055"), // container port cranes
  logistics: unsplash("photo-1601584115197-04ecc0da31d7"), // logistics truck / warehouse
  globeMap: unsplash("photo-1526778548025-fa2f459cd5c1"), // world map / globe
  factoryLine: unsplash("photo-1565043666747-69f6646db940"), // production line
  suspension: unsplash("photo-1552519507-da3b142c6e3d"), // car suspension detail
  brakeDisc: unsplash("photo-1600661653561-629509216228"), // brake disc / rotor
  tyres: unsplash("photo-1621361365424-06f0e1eb0e56"), // stacked tyres
  carAccessories: unsplash("photo-1503376780353-7e6692767b70"), // car interior detailing
  evComponents: unsplash("photo-1617704548623-340376564e68"), // EV drivetrain / motor
  industrialBattery: unsplash("photo-1553406830-ef2513450d76"), // industrial power storage
  aboutOffice: unsplash("photo-1497366216548-37526070297c"), // corporate office team
  handshake: unsplash("photo-1521791136064-7986c2920216"), // business handshake
} as const;

export type SiteImageKey = keyof typeof siteImages;
