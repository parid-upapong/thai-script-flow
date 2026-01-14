class LogisticsPlanner:
    """
    Estimates production time and logistics for a Thai shoot.
    Considers 'The Bangkok Factor' (Traffic, Rain, Food Breaks).
    """
    def __init__(self, scene_list):
        self.scene_list = scene_list

    def estimate_schedule(self):
        # 1. Group scenes by location
        # 2. Calculate 'Move Time' between locations using Thai Traffic Logic
        # 3. Add 'Buffet Time' (Thai crews value meal times significantly)
        # 4. Generate a 'Call Sheet' draft
        
        schedule = []
        for scene in self.scene_list:
            est_time = self._calculate_production_hours(scene)
            schedule.append({
                "scene": scene['scene_id'],
                "est_duration": est_time,
                "notes": "เผื่อเวลาฝนตกหากเป็นหน้าฝน" # Buffer for rainy season
            })
        return schedule

    def _calculate_production_hours(self, scene):
        # Heuristics for Thai production speed
        base = 2 # hours
        if "Dialogue" in scene['summary']: base += 1
        return base