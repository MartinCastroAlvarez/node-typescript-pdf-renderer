// ----------------------------------------------------------------
// PURPOSE:
// This library implements the Note interface.
//
// JSON serializers:
// The main purpose is to save the state of an object in order to
// be able to recreate it when needed. The reverse process is called
// deserialization
// ----------------------------------------------------------------

import { SerializedText } from './Text';

export interface SerializedNote extends SerializedText {}
