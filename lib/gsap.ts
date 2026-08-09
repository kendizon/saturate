"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering here — rather than inside a component's useEffect — guarantees
// the plugin is available before any child component's effects run, since
// module evaluation happens before React commits effects.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
