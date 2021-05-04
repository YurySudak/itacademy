package zen.tables.backend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;
import zen.tables.backend.model.Group;
import zen.tables.backend.repository.GroupRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(Const.url)
@AllArgsConstructor
public class GroupController {

    private final GroupRepository groupRepository;
    

    @GetMapping(Const.groupUrl)
    public List<Group> getAllGroups() {
        return groupRepository.findAll().stream()
                .sorted(Comparator.comparingInt(Group::getId))
                .collect(Collectors.toList());
    }

    @PostMapping(Const.groupUrl)
    public Group createGroup(@RequestBody Group group) {
        return groupRepository.save(group);
    }

    @GetMapping(Const.groupUrl + "/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable Integer id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Group not exist with id: " + id));
        return ResponseEntity.ok(group);
    }

    @PutMapping(Const.groupUrl + "/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable Integer id, @RequestBody Group groupDetails) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Group not exist with id: " + id));
        group.setGroupName(groupDetails.getGroupName());
        Group updatedGroup = groupRepository.save(group);
        return ResponseEntity.ok(updatedGroup);
    }

    @DeleteMapping(Const.groupUrl + "/{id}")
    public ResponseEntity<Boolean> deleteGroup(@PathVariable Integer id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new ResourceAccessException("Group not exist with id: " + id));
        groupRepository.delete(group);
        return ResponseEntity.ok(true);
    }
}