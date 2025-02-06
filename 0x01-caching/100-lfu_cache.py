#!/usr/bin/python3
"""inherits from BaseCaching and is a caching system"""

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """caching system"""
    def __init__(self):
        """initializer"""
        super().__init__()
        self.keys = []
        self.uses = {}

    def put(self, key, item):
        """assign to the dictionary the item value for the key"""
        if key is not None and item is not None:
            if (len(self.keys) == BaseCaching.MAX_ITEMS and
                    key not in self.keys):
                lfu = self.keys.pop(self.keys.index(self.LFU()))
                del self.cache_data[lfu]
                del self.uses[lfu]
                print(f"DISCARD: {lfu}")
            self.cache_data[key] = item
            if key not in self.keys:
                self.keys.append(key)
                self.uses[key] = 0
            else:
                self.keys.append(self.keys.pop(self.keys.index(key)))
                self.uses[key] += 1

    def get(self, key):
        """return the value in self.keys linked to key"""
        if key is not None and key in self.cache_data:
            self.keys.append(self.keys.pop(self.keys.index(key)))
            self.uses[key] += 1
            return self.cache_data[key]
        return None

    def LFU(self):
        """return lfu key"""
        items = list(self.uses.items())
        freqs = [item[1] for item in items]
        least = min(freqs)

        lfu_list = [item[0] for item in items if item[1] == least]
        for key in self.keys:
            if key in lfu_list:
                return key
