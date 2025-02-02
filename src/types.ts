import { ColorResolvable } from 'discord.js';

import type { InteractionIdentifier } from './actionHandlers/commands/types';

export type Feature = 'ping' | 'blockLinks' | 'welcome' | InteractionIdentifier;
export type Channel = 'logs' | 'modLogs' | 'welcome' | 'rules';
export type Role = 'bot' | 'member';
export type Embed = keyof DefaultServerConfig['embeds'];

export type ID = string;

export type FeaturesSchema = { [t in Feature]: BooleanConstructor };

export type Features = { [t in Feature]: boolean };
export type Channels = { [t in Channel]: string | null };
export type Roles = { [t in Role]: string | null };

export type FeatureName = keyof FeaturesSchema;

export interface DefaultServerConfig {
  features: Features;
  isMaintenance: boolean;
  isDevServer: boolean;
  embeds: { color: ColorResolvable };
  channels: Channels;
  roles: Roles;
}

export type ServerConfigItem = keyof DefaultServerConfig;

export interface DefaultUserConfig {
  warns: {
    number: number;
    reasons: string[];
  };
}
